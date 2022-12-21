import re

lines = open("data").read().splitlines()
bs = set()
input = []
for line in lines:
    ns = re.findall(r"-?\d+", line)
    a = []
    for n in ns:
        a.append(int(n))
    input.append(a)
    bs.add((a[0], a[1]))
    bs.add((a[2], a[3]))

s = set()
y = 2000000
for i in input:
    d = abs(i[2] - i[0]) + abs(i[3] - i[1])
    if abs(y - i[1]) > d:
        continue
    for x in range(i[0] - d, i[0] + d + 1):
        e = abs(i[0] - x) + abs(i[1] - y)
        if e > d:
            continue
        if (x, y) not in bs:
            s.add((x, y))

print(len(s))
