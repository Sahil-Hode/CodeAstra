#!/bin/bash
echo "Fixing file watcher limit..."
sudo sysctl fs.inotify.max_user_watches=524288
echo "Fixed! Now run: npm run dev"