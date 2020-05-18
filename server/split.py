from PIL import Image
import sys



def cut_image(image, name):
	width, height = image.size
	item_width = 200
	sliceNum = int(width // item_width)
	print(sliceNum)
	box_list=[]
	namelist = []
	count=0
	for j in range(0,sliceNum):
		for i in range(0,sliceNum):
			count+=1
			box=(i*item_width,j*item_width,(i+1)*item_width,(j+1)*item_width)
			box_list.append(box)
			namelist.append(f'./dist/1/{name}-{i}-{j}.png')
	print(count, box)
	image_list=[image.crop(box) for box in box_list]
	return image_list, namelist
 
def save_images(image_list, namelist):
	index=1
	for i in range(len(namelist)):
		image = image_list[i]
		filename = namelist[i]
		image.save(filename)
		index+=1

if __name__ == '__main__':
	file_path="./png/1/6400.png"
	image=Image.open(file_path)
	image_list, namelist=cut_image(image, 4)
	save_images(image_list, namelist)
