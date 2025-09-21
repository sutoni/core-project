<?php

    use Illuminate\Support\Facades\Route;
    use App\Http\Controllers\AuthController;

    Route::post('/register', [AuthController::class, 'register']);
    //Route::post('/login', [AuthController::class, 'login']);
    Route::post('/login', [AuthController::class, 'loginStep1']); // ganti login lama
    //Route::post('/send-otp', [AuthController::class, 'sendOtp']);
    Route::post('/verify-otp', [AuthController::class, 'verifyOtp']);
    Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

