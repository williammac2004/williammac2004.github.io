try:
    from googlesearch import search
except ImportError:
    print("No module named 'google' found")


f=open('newnewcompanylist.txt','r')
for line in f.readlines():
    # to search

	query = line

	for j in search(query, tld="co.in", num=10, stop=1, pause=2):
	    print(j)
