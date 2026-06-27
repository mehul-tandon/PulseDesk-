<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function store(Request $request, Ticket $ticket)
    {
        $request->validate([
            'body' => 'required|string',
            'is_internal' => 'boolean',
        ]);

        $comment = Comment::create([
            'ticket_id' => $ticket->id,
            'author_id' => Auth::id(),
            'body' => $request->body,
            'is_internal' => $request->is_internal ?? false,
        ]);

        return response()->json($comment->load(['author']), 201);
    }
}
