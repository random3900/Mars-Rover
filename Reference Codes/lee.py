import sys 
sys.setrecursionlimit(10**9) 


class Solution(object):
    def __init__(self, maze, start, finish):
        self.maze = maze
        self.m = 12
        self.n = 12
        self.start = start
        self.finish = finish
        #CREATE VISITED MATRIX
        self.visited = [[False for i in range(self.n)]for j in range(self.m)]
        self.cost = [[-1 for i in range(self.n)]for j in range(self.m)]
        #MARK START POINT TO ZERO
        self.cost[start[0]][start[1]] = 0
        self.visited[start[0]][start[1]] = True
        self.queue = [] #PROCESS QUEUE

    def dimension(self):
        print("Grid Dimensions: ",self.m,"x",self.n)
    
    def isValid(self, x,y):
        if(x<0 or y<0 or x>=self.m or y>=self.n):
            return False
        elif(self.maze[x][y]=='t'):
            return True
        else:
            return False
    
    
    
    def go(self):
        if(len(self.queue)==0):
            return

        
        x,y=self.queue[0][0],self.queue[0][1]
        self.queue.pop(0)

        if(not self.isValid(x,y)):
            return
        elif(x==self.finish[0] and y==self.finish[1]):
            return
        else:
            self.visited[x][y] = True
            # LEFT
            if(self.isValid(x,y-1) and not self.visited[x][y-1]):
                self.queue.append((x,y-1))
                if(self.cost[x][y-1] == -1):
                    self.cost[x][y-1] = self.cost[x][y] + 1
                else:
                    self.cost[x][y-1] = min(self.cost[x][y] + 1, self.cost[x][y-1])
            # TOP
            if(self.isValid(x-1,y) and not self.visited[x-1][y]):
                self.queue.append((x-1,y))
                if(self.cost[x-1][y] == -1):
                    self.cost[x-1][y] = self.cost[x][y] + 1
                else:
                    self.cost[x-1][y] = min(self.cost[x][y] + 1, self.cost[x-1][y])
            # RIGHT
            if(self.isValid(x,y+1) and not self.visited[x][y+1]):
                self.queue.append((x,y+1))
                if(self.cost[x][y+1] == -1):
                    self.cost[x][y+1] = self.cost[x][y] + 1
                else:
                    self.cost[x][y+1] = min(self.cost[x][y] + 1, self.cost[x][y+1])
            # BOTTOM
            if(self.isValid(x+1,y) and not self.visited[x+1][y]):
                self.queue.append((x+1,y))
                if(self.cost[x+1][y] == -1):
                    self.cost[x+1][y] = self.cost[x][y] + 1
                else:
                    self.cost[x+1][y] = min(self.cost[x][y] + 1, self.cost[x+1][y])
            
            self.go()
            
    def minCost(self):
        self.queue.append((self.start[0], self.start[1]))
        self.go()
        return self.cost[self.finish[0]][self.finish[1]]
            


s = Solution([['t', 't', 't', 'f','t', 'f', 't', 't','t', 't', 't', 't'],
              ['t', 't', 't', 't','t', 't', 't', 't','t', 't', 't', 't'],
              ['t', 't', 't', 't','t', 't', 't', 't','t', 't', 't', 'f'],
              ['t', 't', 't', 't','t', 't', 't', 't','t', 't', 't', 't'],
              ['t', 't', 't', 't','t', 't', 't', 't','t', 't', 't', 't'],
              ['t', 't', 't', 't','t', 't', 't', 't','t', 't', 't', 't'],
              ['t', 'f', 't', 't','t', 't', 't', 't','t', 't', 't', 't'],
              ['t', 't', 't', 't','t', 't', 't', 't','t', 't', 't', 't'],
              ['t', 't', 't', 't','t', 't', 't', 't','t', 't', 't', 't'],
              ['t', 't', 't', 't','t', 't', 't', 't','t', 't', 'f', 't'],
              ['t', 't', 't', 't','t', 't', 't', 't','t', 't', 't', 't'],
              ['t', 't', 't', 't','t', 't', 't', 't','t', 't', 't', 't']], (0,0), (11,11))
print(s.minCost())
print(s.cost)
