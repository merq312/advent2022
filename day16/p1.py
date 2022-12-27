from collections import deque
import functools
import re

lines = open("data").read().splitlines()
valves = {}
for line in lines:
    line_split = line.split(" ")
    frm = line_split[1]
    to = []
    for ls in line_split[9:-1]:
        to.append(ls[:-1])
    to.append(line_split[-1])
    rate = re.findall(r"\d+", line_split[4])[0]
    valves[frm] = {"to": to, "rate": int(rate)}


@functools.cache
def shortestPath(start, end):
    queue = deque()
    visited = set()

    visited.add(start)
    queue.append([0, start])

    while queue:
        steps, valve = queue.popleft()
        for to in valves[valve]["to"]:
            if to in visited:
                continue
            if to == end:
                return steps + 1
            visited.add(to)
            queue.append([steps + 1, to])

    return -1


max_pressure = 0
stack = [(["AA"], 0, {})]

openable_valves = []
for k, v in valves.items():
    if v["rate"] != 0:
        openable_valves.append(k)

while stack:
    path, time, open_valves = stack.pop()
    for valve in openable_valves:
        if valve in open_valves:
            continue
        dist = shortestPath(path[-1], valve)
        new_path = path.copy()
        new_path.append(valve)
        new_open_valves = open_valves.copy()
        new_time = time + dist + 1
        new_open_valves[valve] = new_time

        if len(new_open_valves) == len(openable_valves) or new_time >= 30:
            pressure = 0
            for valve, open_time in new_open_valves.items():
                pressure += max(30 - open_time, 0) * valves[valve]["rate"]
            max_pressure = max(pressure, max_pressure)
        else:
            stack.append((new_path, new_time, new_open_valves))

print(max_pressure)
