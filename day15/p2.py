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

r = 4000000
ss = set()
for i in input:
    d = abs(i[2] - i[0]) + abs(i[3] - i[1])
    yt = i[1] + d + 1
    xl = i[0]
    xr = i[0]
    while yt >= i[1] - d - 1:
        if xl < r and xl > 0 and yt < r and yt > 0:
            ss.add((xl, yt))
        if xr < r and xr > 0 and yt < r and yt > 0:
            ss.add((xr, yt))
        yt -= 1
        if yt >= i[1]:
            xr -= 1
            xl += 1
        else:
            xr += 1
            xl -= 1

for (x, y) in ss:
    flg = True
    for i in input:
        d = abs(i[2] - i[0]) + abs(i[3] - i[1])
        e = abs(i[0] - x) + abs(i[1] - y)
        if e <= d:
            flg = False
            break
    if flg:
        print(x * 4000000 + y)
        exit(0)
