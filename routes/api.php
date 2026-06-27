<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\CommentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    // Tickets
    Route::apiResource('tickets', TicketController::class)->only(['index', 'show', 'store', 'update']);

    // Comments (nested under tickets)
    Route::post('/tickets/{ticket}/comments', [CommentController::class, 'store']);
});
