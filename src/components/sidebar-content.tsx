
'use client';

import { useState, useMemo } from 'react';
import { SidebarContent, SidebarInput } from '@/components/ui/sidebar';
import { tasks } from '@/lib/tasks';

export function SidebarContentWrapper() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = useMemo(() => {
    if (!searchQuery) {
      return [];
    }
    return tasks.filter((task) =>
      task.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <SidebarContent>
      <div className="p-2 mt-8">
        <SidebarInput
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {filteredTasks.length > 0 && (
          <div className="mt-4">
            <h2 className="text-xs font-semibold text-muted-foreground px-2">Companies</h2>
            <ul className="mt-2 space-y-1">
              {filteredTasks.map((task) => (
                <li
                  key={task.id}
                  className="text-sm p-2 rounded-md hover:bg-muted cursor-pointer"
                >
                  {task.customerName}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </SidebarContent>
  );
}
