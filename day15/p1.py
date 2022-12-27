import re

bs = set()
input = []
for line in open("data"):
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
    rem = d - abs(y - i[1])
    if rem < 0:
        continue
    for x in range(i[0] - rem, i[0] + rem + 1):
        if (x, y) not in bs:
            s.add((x, y))

print(len(s))
