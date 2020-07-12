def initi(c,d):
    flag=0
    temp=mat[c][d]
    mini=temp
  
    if c+1<row and mat[c+1][d]!=-1 :
        mini=min(mat[c][d],mat[c+1][d]+1,mini)
        
    if d+1<col and mat[c][d+1]!=-1:
        mini=min(mat[c][d],mat[c][d+1]+1,mini)
            
    if d-1>=0 and mat[c][d-1]!=-1:
        mini=min(mat[c][d-1]+1,mat[c][d],mini)
            
    if c-1>=0 and mat[c-1][d]!=-1:
        mini=min(mat[c-1][d]+1,mat[c][d],mini)

    if c+1<row and d+1<col and mat[c+1][d+1]!=-1:
        mini=min(mat[c+1][d+1]+1,mat[c][d],mini)

    if c-1>=0 and d+1<col and mat[c-1][d+1]!=-1:
        mini=min(mat[c-1][d+1]+1,mat[c][d],mini)

    if c+1<row and d-1>=0 and mat[c+1][d-1]!=-1:
        mini=min(mat[c+1][d-1]+1,mat[c][d],mini)

    if c-1>=0 and d-1>=0 and mat[c-1][d-1]!=-1:
        mini=min(mat[c-1][d-1]+1,mat[c][d],mini)
    if temp>mini:
        flag=1
        mat[c][d]=mini
        
    return flag




row=10
col=16
flag=0
mat=[[(row*col*row)+1 for i in range(0,16)] for  j in range(0,10)]
print("Enter the indices of source")
s1,s2=map(int,input().split())
d1,d2=map(int,input("Enter the indices of destination\n").split())
mat[d1][d2]=0
print("Enter the indices of blocks")
flag=int(input("Enter 0 to continue"))
while(flag==0):
    a,b=map(int,input().split())
    mat[a][b]=-1
    flag=int(input("Enter 0 to continue"))


v=row*col*row
k=0
while(k<v):
    
    flag=0
    for i in range(d1,row):
        for j in range(d2,col):
            if mat[i][j]!=-1:
                flag=max(flag,initi(i,j))

    for i in range(d1,row):
        for j in range(d2,-1,-1):
            if mat[i][j]!=-1:
                flag=max(flag,initi(i,j))
    for i in range(d1,-1,-1):
        for j in range(d2,col):
            if mat[i][j]!=-1:
                flag=max(flag,initi(i,j))
    for i in range(d1,-1,-1):
        for j in range(d2,-1,-1):
            if mat[i][j]!=-1:
                flag=max(flag,initi(i,j))
    if flag==0:
        break
    k+=1


print(mat)






l1=[]
l2=[]
i=s1
j=s2
while(not(i==d1 and j==d2)):
    mini=row*col*row
    if i+1<row and mat[i+1][j]!=-1:
        mini=mat[i+1][j]
        c=i+1
        d=j
    if j+1<col and mini>mat[i][j+1] and mat[i][j+1]!=-1:
        mini=mat[i][j+1]
        c=i
        d=j+1
    if i-1>=0 and mini>mat[i-1][j] and mat[i-1][j]!=-1:
        mini=mat[i-1][j]
        c=i-1
        d=j
    if j-1>=0 and mini>mat[i][j-1] and mat[i][j-1]!=-1:
        mini=mat[i][j-1]
        c=i
        d=j-1
    if i+1<row and j+1<col and mini>mat[i+1][j+1] and mat[i+1][j+1]!=-1:
        mini=mat[i+1][j+1]
        c=i+1
        d=j+1
    if i+1<row and j-1>=0 and mini>mat[i+1][j-1] and mat[i+1][j-1]!=-1:
        mini=mat[i+1][j-1]
        c=i+1
        d=j-1
    if i-1>=0 and j+1<col and mini>mat[i-1][j+1] and mat[i-1][j+1]!=-1:
        mini=mat[i-1][j+1]
        c=i-1
        d=j+1
    if i-1>=0 and j-1>=0 and mini>mat[i-1][j-1] and mat[i-1][j-1]!=-1:
        mini=mat[i-1][j-1]
        c=i-1
        d=j-1
    i=c
    j=d
    l1.append(i)
    l2.append(j)

n1=len(l1)
print("The path to the destination")
for i in range(0,n1):
    print(l1[i],l2[i])
    



    
