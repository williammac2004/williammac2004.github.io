import shutil

total, used, free = shutil.disk_usage(__file__)
print(free)



i = 0
while i <= free:
	name = str(i)
	my_file = open(name,"w+")
	my_file.write("b")
	i = i+1