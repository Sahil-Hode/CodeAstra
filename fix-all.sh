#!/bin/bash
echo "Fixing file watcher limits..."
sudo sysctl fs.inotify.max_user_watches=524288
sudo sysctl fs.inotify.max_user_instances=512
sudo sysctl -p
echo "Limits increased. Restarting services..."