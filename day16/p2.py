from collections import deque
import functools
import re
from itertools import combinations

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


# Use BFS to find the shortest path from node to node
# Thus constructing a weighted graph from the non-zero rate valves
# Cache it (or we could have just made a dictionary at the start)
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
# [Path, time elapsed, { valve: time opened }]
stack = [(["AA"], 0, {})]

openable_valves = []
for k, v in valves.items():
    if v["rate"] != 0:
        openable_valves.append(k)

path_pressures = {}

# Use DFS to check all possible paths for max pressure
# DFS because we always take the shorest path anyway
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

        # Add all computed pressures to a sorted dict
        # We only care about the highest pressure for a given combination
        pressure = 0
        for valve, open_time in new_open_valves.items():
            pressure += max(26 - open_time, 0) * valves[valve]["rate"]
        key = ",".join(sorted(new_open_valves.keys()))
        path_pressures[key] = max(
            path_pressures[key] if key in path_pressures else 0, pressure
        )

        if len(new_open_valves) == len(openable_valves) or new_time >= 26:
            pressure = 0
            for valve, open_time in new_open_valves.items():
                pressure += max(26 - open_time, 0) * valves[valve]["rate"]
            path_pressures[key] = max(
                path_pressures[key] if key in path_pressures else 0, pressure
            )
            max_pressure = max(pressure, max_pressure)

            # If not all valves are visited, all possible combinations of the remaining
            # valves have to be added to the dict to have all possible complements
            unopened_valves = []
            for valve in openable_valves:
                if valve not in new_open_valves.keys():
                    unopened_valves.append(valve)

            # Cheat by limiting "max" path length for an agent
            # This limit may have to be raised for increasingly imbalanced graphs
            if len(unopened_valves) < len(openable_valves) * 0.6:
                for r in range(len(unopened_valves)):
                    for c in combinations(unopened_valves, r):
                        key = ",".join(sorted(list(new_open_valves.keys()) + list(c)))
                        path_pressures[key] = max(
                            path_pressures[key] if key in path_pressures else 0,
                            pressure,
                        )

        else:
            stack.append((new_path, new_time, new_open_valves))

print(max_pressure)
print(len(path_pressures))

# For every path_pressure, its complement is the path the 2nd agent should take
# Find the max pressure for the complement path and add them together
max_combined_pressure = 0
while path_pressures:
    path, c1 = path_pressures.popitem()
    c1x = path.split(",")
    if len(c1x) == len(openable_valves):
        continue
    c2x = []
    for valve in openable_valves:
        if valve not in c1x:
            c2x.append(valve)
    c2x = ",".join(sorted(c2x))
    if c2x not in path_pressures:
        continue
    c2 = path_pressures.pop(c2x)
    max_combined_pressure = max(max_combined_pressure, c1 + c2)

print(max_combined_pressure)
