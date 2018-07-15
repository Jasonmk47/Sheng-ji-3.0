import glob
import os
os.chdir('../client/src/constants/cards')
files = []
for file in glob.glob("*.png"):
    files.append(file.split('_'))

files = sorted(files, key=lambda x: int(x[0]) if str.isdigit(x[0]) else 100)
files = sorted(files, key=lambda x: 'a' if str.isdigit(
    x[0]) else 'z' if x[0] == 'ace' else 'A' if x[0] == 'SJ' else 'y' if x[0] == 'king' else x[0])
files = sorted(files, key=lambda x: x[2])

objectBuilder = "{"

i = 0
# For import statements
# for file in files:
#     name = '_'.join(file)
#     objectBuilder += "\n " + str(i) + ": require('./cards/" + name + '\'),'
#     i+=1

# For name
for file in files:

    suit = file.pop().split('.')
    name = ' '.join(file)
    name = name + ' ' + suit[0]
    objectBuilder += "\n " + str(i) + ": '" + name + '\','
    i += 1

objectBuilder += "\n}"
print(objectBuilder)
