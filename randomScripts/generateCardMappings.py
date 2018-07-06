import glob, os
os.chdir('../client/public/cards');
files = []
for file in glob.glob("*.png"):
    files.append(file.split('_'))

files = sorted(files, key=lambda x: int(x[0]) if str.isdigit(x[0]) else 100)
files = sorted(files, key=lambda x: 'a' if str.isdigit(x[0]) else 'z' if x[0] == 'ace' else 'A' if x[0] == 'SJ' else 'y' if x[0] == 'king' else x[0])
files = sorted(files, key=lambda x: x[2])

objectBuilder = "{"

i = 0
for file in files:
    name = '_'.join(file)
    objectBuilder += "\n " + str(i) + ": '" + name + '\','
    i+=1

objectBuilder += "\n}"
print(objectBuilder)