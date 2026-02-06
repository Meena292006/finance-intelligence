def chain_of_thought(task: str) -> str:
    """Return a short, human-readable reasoning trace for debugging/demo purposes."""
    steps = [
        f"Understand the task: {task}",
        "Identify relevant data and constraints",
        "Propose a short answer or next action",
    ]
    return " -> ".join(steps)
