import cv2
string = 'asdfscfbhuizxcvjkhnsdnocvsdjcvsdcxc'
count = len(string)
img = cv2.imread('./2.jpg')
u,v,_ = img.shape
c = img*0+255
gray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
for i in range(0,u,6):
    for j in range(0,v,6):
        pix = gray[i,j]
        b,g,r = img[i,j]
        zifu = string[int(((count -1) * pix) / 256)]
        cv2.putText(c,zifu,(j,i),cv2.FONT_HERSHEY_COMPLEX, 0.2, (int(b),int(g),int(r),1))

cv2.imwrite('22.png',c)
