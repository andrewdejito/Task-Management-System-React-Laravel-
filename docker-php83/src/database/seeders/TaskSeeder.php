<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Task;

class TaskSeeder extends Seeder
{
    public function run()
    {
        $statuses = ['pending', 'in_progress', 'completed'];

        for ($i = 1; $i <= 20; $i++) {
            Task::create([
                'title' => "Task #$i",
                'description' => "Description for Task #$i",
                'status' => $statuses[array_rand($statuses)],
                'due_date' => now()->addDays(rand(1, 30)),
            ]);
        }
    }
}
