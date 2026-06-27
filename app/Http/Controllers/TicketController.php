<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TicketController extends Controller
{
    public function index(Request $request)
    {
        // TenantScope automatically scopes this to the user's organization
        return Ticket::with(['requester', 'assignee'])->latest()->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'subject' => 'required|string|max:255',
            'description' => 'required|string',
            'priority' => 'required|in:low,normal,high,urgent',
        ]);

        $ticket = Ticket::create([
            'organization_id' => Auth::user()->organization_id,
            'requester_id' => Auth::id(),
            'subject' => $request->subject,
            'description' => $request->description,
            'status' => 'open',
            'priority' => $request->priority,
        ]);

        return response()->json($ticket->load(['requester']), 201);
    }

    public function show(Ticket $ticket)
    {
        // TenantScope ensures they can only see tickets from their org
        return $ticket->load(['requester', 'assignee', 'comments.author']);
    }

    public function update(Request $request, Ticket $ticket)
    {
        $request->validate([
            'status' => 'sometimes|string|in:open,pending,resolved,closed',
            'priority' => 'sometimes|string|in:low,normal,high,urgent',
            'assignee_id' => 'nullable|exists:users,id',
        ]);

        $ticket->update($request->only(['status', 'priority', 'assignee_id']));

        return response()->json($ticket->load(['requester', 'assignee']));
    }
}
