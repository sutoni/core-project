<?php

namespace App\Http\Controllers;

use App\Models\UserOtp;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json($user);
    }

    // STEP 1: Login pakai email + password
    public function loginStep1(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Email atau password salah'], 401);
        }

        $user = Auth::user();

        // Generate OTP
        $otp = rand(100000, 999999);

        UserOtp::create([
            'user_id' => $user->id,
            'otp' => $otp,
            'expires_at' => now()->addMinutes(5),
        ]);

        // Kirim email OTP
        Mail::raw("Kode OTP Anda adalah: $otp (berlaku 5 menit)", function ($message) use ($user) {
            $message->to($user->email)
                    ->subject('Kode OTP Verifikasi');
        });

        return response()->json([
            'message' => 'Login berhasil, OTP dikirim ke email. Silakan verifikasi OTP.',
            'email'   => $user->email
        ]);
    }

    // STEP 2: Verifikasi OTP
    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'otp'   => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        $record = UserOtp::where('user_id', $user->id)
            ->where('otp', $request->otp)
            ->where('expires_at', '>', now())
            ->latest()
            ->first();

        if (!$record) {
            return response()->json(['message' => 'OTP tidak valid atau sudah kadaluarsa'], 400);
        }

	  // Jika OTP valid → hapus record OTP supaya tidak bisa dipakai ulang
	$record->delete();

	// Jika OTP valid → langsung login generate token Sanctum
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'OTP valid, login sukses',
            'token' => $token,
	    'user' => $user,
	    'roles'       => $user->getRoleNames(),
            'permissions' => $user->getAllPermissions()->pluck('name')
        ]);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out']);
    }
}

