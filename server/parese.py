
def parse1(line, index):
    tmp = line[index+5:]
    tmp = tmp.split(' ')
    x0, y0 = float(tmp[1]), float(tmp[0])
    x1, y1 = float(tmp[-3]), float(tmp[-2][:-2])
    return x0, y0, x1, y1

def parse2(line, index):
    end = line.find('"', index + 3)
    tmp = line[index+5:end]
    tmp = tmp.split(' ')
    x0,y0 = tmp[0].split(',')
    x1,y1 = tmp[-1].split(',')
    return float(x0), float(y0), float(x1), float(y1)

def removeLongPath(filesize, length, fliename):
    minD = 15000 ** 2
    maxD = 0
    sq = length * length
    with open(f'./{fliename}.svg', 'r', encoding='utf8') as f:
        with open(f'./log/{filesize}-{length}.svg', 'w', encoding='utf8') as logger:
            with open(f'./svg/{fliename}/{filesize}.svg', 'w',encoding='utf8') as writer:
                for line in f:
                    if line.find('<svg') == 0:
                        writer.write(
                            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="-7500 -7500 16000 16000" width="{filesize}" height="{filesize}">\n')
                        continue
                    if line.find('<path') < 0:
                        writer.write(line)
                        continue
                    index = line.find('d="M')
                    if index > 0:
                        x0, y0 ,x1, y1 = parse2(line, index)
                        if sq > (x1 - x0) ** 2 + (y1 - y0) ** 2:
                            writer.write(line)
                        else:
                            squre = (x1 - x0) ** 2 + (y1 - y0) ** 2
                            logger.write(line)
                            minD = min(minD, squre)
                            maxD = max(maxD, squre)
                    else:
                        writer.write(line)
    print(minD ** 0.5, maxD ** 0.5)


removeLongPath(12800, 1600, 1)
removeLongPath(6400, 1600, 1)
removeLongPath(3200, 3200, 1)
removeLongPath(1600, 6400, 1)
removeLongPath(800, 14000, 1)
