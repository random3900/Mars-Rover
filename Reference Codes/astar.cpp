#include<bits/stdc++.h> 
using namespace std;  
#define ROW 5
#define COL 5  
typedef pair<int, int> Pair;    
typedef pair<double, pair<int, int>> pPair; 
  

struct cell 
{ int parent_i, parent_j; 
  double f, g, h; 
}; 
  
bool cell_unblocked(int grid[][COL], int row, int col) 
{   if (grid[row][col] == 1) 
        return (true); 
    else
        return (false); 
} 
  
bool cell_valid(int row, int col) 
{ 
    return (row >= 0) && (row < ROW) && 
           (col >= 0) && (col < COL); 
}  
bool cell_destination(int row, int col, Pair dest) 
{ 
    if (row == dest.first && col == dest.second) 
        return (true); 
    else
        return (false); 
} 
   
double euclidian_distance(int row, int col, Pair dest) 
{  return ((double)sqrt ((row-dest.first)*(row-dest.first) 
                          + (col-dest.second)*(col-dest.second))); 
} 

double manhattan_distance(int row, int col, Pair dest)
{  return abs(row-dest.first)+abs(col-dest.second);
}


double diagonal_distance(int row, int col, Pair dest)
{  return max(abs(row-dest.first),abs(col-dest.second));
}

void tracePath(cell C[][COL], Pair dest) 
{ 
    cout<<("\nThe Path is "); 
    int row = dest.first; 
    int col = dest.second; 
  
    stack<Pair> Path; 
  
    while (!(C[row][col].parent_i == row && C[row][col].parent_j == col )) 
    { 
        Path.push (make_pair (row, col)); 
        int temp_row = C[row][col].parent_i; 
        int temp_col = C[row][col].parent_j; 
        row = temp_row; 
        col = temp_col; 
    } 
  
    Path.push (make_pair (row, col)); 
    while (!Path.empty()) 
    { 
        pair<int,int> p = Path.top(); 
        Path.pop(); 
        cout<<"-->"<<p.first<<p.second; 
    } 
  
    return; 
} 
 
void aStarSearch(int grid[][COL], Pair source, Pair dest, double weight) 
{   
    if (cell_destination(source.first, source.second, dest) == true) 
    { 
        return; 
    } 
    bool closedList[ROW][COL]; 
    memset(closedList, false, sizeof (closedList)); 
    cell C[ROW][COL]; 
    int i, j; 
    for (i=0; i<ROW; i++) 
    { 
        for (j=0; j<COL; j++) 
        { 
            C[i][j].f = FLT_MAX; 
            C[i][j].g = FLT_MAX; 
            C[i][j].h = FLT_MAX; 
            C[i][j].parent_i = -1; 
            C[i][j].parent_j = -1; 
        } 
    } 
    i = source.first, j = source.second; 
    C[i][j].f = 0.0; 
    C[i][j].g = 0.0; 
    C[i][j].h = 0.0; 
    C[i][j].parent_i = i; 
    C[i][j].parent_j = j; 
  
    set<pPair> openList; 
    openList.insert(make_pair (0.0, make_pair (i, j))); 
    bool foundDest = false; 
    double gNew, hNew, fNew; 
    while (!openList.empty()) 
    { 
        pPair p = *openList.begin();
        openList.erase(openList.begin()); 
        i = p.second.first; 
        j = p.second.second; 
        closedList[i][j] = true; 
       if (cell_valid(i-1, j) == true) 
       { 
        if (cell_destination(i-1, j, dest) == true) 
            {   C[i-1][j].parent_i = i; 
                C[i-1][j].parent_j = j; 
                cout<<("The destination cell is found\n"); 
                tracePath (C, dest); 
                foundDest = true; 
                return; 
            } 
            else if (closedList[i-1][j] == false && 
                     cell_unblocked(grid, i-1, j) == true) 
            { 
                gNew = C[i][j].g + 1.0; 
                hNew = euclidian_distance (i-1, j, dest); 
                fNew = gNew +(weight*hNew); 
                if (C[i-1][j].f == FLT_MAX || C[i-1][j].f > fNew) 
                { 
                    openList.insert( make_pair(fNew,make_pair(i-1, j))); 
                    C[i-1][j].f = fNew; 
                    C[i-1][j].g = gNew; 
                    C[i-1][j].h = hNew; 
                    C[i-1][j].parent_i = i; 
                    C[i-1][j].parent_j = j; 
                } 
            }  
       }
       if (cell_valid(i+1, j) == true) 
        { 

        if (cell_destination(i+1, j, dest) == true) 
            {   C[i+1][j].parent_i = i; 
                C[i+1][j].parent_j = j; 
                cout<<("The destination cell is found\n"); 
                tracePath(C, dest); 
                foundDest = true; 
                return; 
            } 
            else if (closedList[i+1][j] == false && 
                     cell_unblocked(grid, i+1, j) == true) 
            { 
                gNew = C[i][j].g + 1.0; 
                hNew = euclidian_distance(i+1, j, dest); 
                fNew = gNew +(weight*hNew); 

                if (C[i+1][j].f == FLT_MAX || C[i+1][j].f > fNew) 
                { 
                    openList.insert( make_pair (fNew, make_pair (i+1, j))); 
                    // Update the details of this cell 
                    C[i+1][j].f = fNew; 
                    C[i+1][j].g = gNew; 
                    C[i+1][j].h = hNew; 
                    C[i+1][j].parent_i = i; 
                    C[i+1][j].parent_j = j; 
                } 
            } 
        }
        if (cell_valid(i, j+1) == true) 
        {
        if (cell_destination(i, j+1, dest) == true) 
            {   C[i][j+1].parent_i = i; 
                C[i][j+1].parent_j = j; 
                cout<<("The destination cell is found\n"); 
                tracePath(C, dest); 
                foundDest = true; 
                return; 
            } 

            else if (closedList[i][j+1] == false && 
                     cell_unblocked (grid, i, j+1) == true) 
            { 
                gNew = C[i][j].g + 1.0; 
                hNew = euclidian_distance (i, j+1, dest); 
                fNew = gNew +(weight*hNew);

                if (C[i][j+1].f == FLT_MAX || 
                        C[i][j+1].f > fNew) 
                { 
                    openList.insert( make_pair(fNew, 
                                        make_pair (i, j+1))); 
  
                    // Update the details of this cell 
                    C[i][j+1].f = fNew; 
                    C[i][j+1].g = gNew; 
                    C[i][j+1].h = hNew; 
                    C[i][j+1].parent_i = i; 
                    C[i][j+1].parent_j = j; 
                } 
            } 
        }
        if (cell_valid(i, j-1) == true) 
        {
        if (cell_destination(i, j-1, dest) == true) 
            { 
                C[i][j-1].parent_i = i; 
                C[i][j-1].parent_j = j; 
                cout<<("The destination cell is found\n"); 
                tracePath(C, dest); 
                foundDest = true; 
                return; 
            } 

            else if (closedList[i][j-1] == false && 
                     cell_unblocked(grid, i, j-1) == true) 
            { 
                gNew = C[i][j].g + 1.0; 
                hNew = euclidian_distance(i, j-1, dest); 
                fNew = gNew +(weight*hNew);
  
                if (C[i][j-1].f == FLT_MAX || 
                        C[i][j-1].f > fNew) 
                { 
                    openList.insert( make_pair (fNew, make_pair (i, j-1))); 
                    C[i][j-1].f = fNew; 
                    C[i][j-1].g = gNew; 
                    C[i][j-1].h = hNew; 
                    C[i][j-1].parent_i = i; 
                    C[i][j-1].parent_j = j; 
                } 
         }
         }
       if (cell_valid(i-1, j+1) == true)
       {
        if (cell_destination(i-1, j+1, dest) == true) 
            {   C[i-1][j+1].parent_i = i; 
                C[i-1][j+1].parent_j = j; 
                cout<<("The destination cell is found\n"); 
                tracePath (C, dest); 
                foundDest = true; 
                return; 
            } 
  
            else if (closedList[i-1][j+1] == false && 
                     cell_unblocked(grid, i-1, j+1) == true) 
            { 
                gNew = C[i][j].g + 1.414; 
                hNew = euclidian_distance(i-1, j+1, dest); 
                fNew = gNew +(weight*hNew);
  
                if (C[i-1][j+1].f == FLT_MAX ||  C[i-1][j+1].f > fNew) 
                { 
                    openList.insert( make_pair (fNew,  
                                    make_pair(i-1, j+1))); 
                    C[i-1][j+1].f = fNew; 
                    C[i-1][j+1].g = gNew; 
                    C[i-1][j+1].h = hNew; 
                    C[i-1][j+1].parent_i = i; 
                    C[i-1][j+1].parent_j = j; 
                } 
            } 
       }
       if (cell_valid(i-1, j-1) == true) 
       {
        if (cell_destination (i-1, j-1, dest) == true)     
              { C[i-1][j-1].parent_i = i; 
                C[i-1][j-1].parent_j = j; 
                cout<<("The destination cell is found\n"); 
                tracePath (C, dest); 
                foundDest = true; 
                return; 
            } 

            else if (closedList[i-1][j-1] == false && 
                     cell_unblocked(grid, i-1, j-1) == true) 
            { 
                gNew = C[i][j].g + 1.414; 
                hNew = euclidian_distance(i-1, j-1, dest); 
                fNew = gNew +(weight*hNew); 

                if (C[i-1][j-1].f == FLT_MAX || 
                        C[i-1][j-1].f > fNew) 
                { 
                    openList.insert( make_pair (fNew, make_pair (i-1, j-1)));  
                    C[i-1][j-1].f = fNew; 
                    C[i-1][j-1].g = gNew; 
                    C[i-1][j-1].h = hNew; 
                    C[i-1][j-1].parent_i = i; 
                    C[i-1][j-1].parent_j = j; 
                } 
            } 
       }
       if (cell_valid(i+1, j+1) == true) 
       {
        if (cell_destination(i+1, j+1, dest) == true) 
            {   C[i+1][j+1].parent_i = i; 
                C[i+1][j+1].parent_j = j; 
                cout<<("The destination cell is found\n"); 
                tracePath (C, dest); 
                foundDest = true; 
                return; 
            } 
  
         
            else if (closedList[i+1][j+1] == false && 
                     cell_unblocked(grid, i+1, j+1) == true) 
            { 
                gNew = C[i][j].g + 1.414; 
                hNew = euclidian_distance(i+1, j+1, dest); 
                fNew = gNew +(weight*hNew); 
  
                if (C[i+1][j+1].f == FLT_MAX || 
                        C[i+1][j+1].f > fNew) 
                { 
                    openList.insert(make_pair(fNew,  
                                        make_pair (i+1, j+1))); 
                    C[i+1][j+1].f = fNew; 
                    C[i+1][j+1].g = gNew; 
                    C[i+1][j+1].h = hNew; 
                    C[i+1][j+1].parent_i = i; 
                    C[i+1][j+1].parent_j = j; 
                } 
            } 
       }
       if (cell_valid(i+1, j-1) == true) 
       {
        if (cell_destination(i+1, j-1, dest) == true) 
             {   C[i+1][j-1].parent_i = i; 
                C[i+1][j-1].parent_j = j; 
                cout<<("The destination cell is found\n"); 
                tracePath(C, dest); 
                foundDest = true; 
                return; 
            } 
  
            else if (closedList[i+1][j-1] == false && 
                     cell_unblocked(grid, i+1, j-1) == true) 
            { 
                gNew = C[i][j].g + 1.414; 
                hNew = euclidian_distance(i+1, j-1, dest); 
                fNew = gNew +(weight*hNew);

                if (C[i+1][j-1].f == FLT_MAX || 
                        C[i+1][j-1].f > fNew) 
                { 
                    openList.insert(make_pair(fNew, make_pair(i+1, j-1)));  
                    C[i+1][j-1].f = fNew; 
                    C[i+1][j-1].g = gNew; 
                    C[i+1][j-1].h = hNew; 
                    C[i+1][j-1].parent_i = i; 
                    C[i+1][j-1].parent_j = j; 
                } 
            } 
        } 
    }
    if (foundDest == false) 
        cout<<("Destination not found"); 
  
    return; 
}
 
  
void a1StarSearch(int grid[][COL], Pair source, Pair dest, double weight) 
{   


    if (cell_destination(source.first, source.second, dest) == true) 
    { 
        return; 
    } 
    bool closedList[ROW][COL]; 
    memset(closedList, false, sizeof (closedList)); 
    cell C[ROW][COL]; 
    int i, j; 
    for (i=0; i<ROW; i++) 
    { 
        for (j=0; j<COL; j++) 
        { 
            C[i][j].f = FLT_MAX; 
            C[i][j].g = FLT_MAX; 
            C[i][j].h = FLT_MAX; 
            C[i][j].parent_i = -1; 
            C[i][j].parent_j = -1; 
        } 
    } 
    i = source.first, j = source.second; 
    C[i][j].f = 0.0; 
    C[i][j].g = 0.0; 
    C[i][j].h = 0.0; 
    C[i][j].parent_i = i; 
    C[i][j].parent_j = j; 
  
    set<pPair> openList; 
    openList.insert(make_pair (0.0, make_pair (i, j))); 
    bool foundDest = false; 
    double gNew, hNew, fNew; 
    while (!openList.empty()) 
    { 
        pPair p = *openList.begin();
        openList.erase(openList.begin()); 
        i = p.second.first; 
        j = p.second.second; 
        closedList[i][j] = true; 
       if (cell_valid(i-1, j) == true) 
       { 
        if (cell_destination(i-1, j, dest) == true) 
            {   C[i-1][j].parent_i = i; 
                C[i-1][j].parent_j = j; 
                cout<<("The destination cell is found\n"); 
                tracePath (C, dest); 
                foundDest = true; 
                return; 
            } 
            else if (closedList[i-1][j] == false && 
                     cell_unblocked(grid, i-1, j) == true) 
            { 
                gNew = C[i][j].g + 1.0; 
                hNew = manhattan_distance(i-1, j, dest); 
                fNew = gNew + (weight*hNew); 
                if (C[i-1][j].f == FLT_MAX || C[i-1][j].f > fNew) 
                { 
                    openList.insert( make_pair(fNew,make_pair(i-1, j))); 
                    C[i-1][j].f = fNew; 
                    C[i-1][j].g = gNew; 
                    C[i-1][j].h = hNew; 
                    C[i-1][j].parent_i = i; 
                    C[i-1][j].parent_j = j; 
                } 
            }  
       }
       if (cell_valid(i+1, j) == true) 
        { 

        if (cell_destination(i+1, j, dest) == true) 
            {   C[i+1][j].parent_i = i; 
                C[i+1][j].parent_j = j; 
                cout<<("The destination cell is found\n"); 
                tracePath(C, dest); 
                foundDest = true; 
                return; 
            } 
            else if (closedList[i+1][j] == false && 
                     cell_unblocked(grid, i+1, j) == true) 
            { 
                gNew = C[i][j].g + 1.0; 
                hNew = manhattan_distance(i+1, j, dest); 
                fNew = gNew +(weight* hNew); 

                if (C[i+1][j].f == FLT_MAX || C[i+1][j].f > fNew) 
                { 
                    openList.insert( make_pair (fNew, make_pair (i+1, j))); 
                   
                    C[i+1][j].f = fNew; 
                    C[i+1][j].g = gNew; 
                    C[i+1][j].h = hNew; 
                    C[i+1][j].parent_i = i; 
                    C[i+1][j].parent_j = j; 
                } 
            } 
        }
        if (cell_valid(i, j+1) == true) 
        {
        if (cell_destination(i, j+1, dest) == true) 
            {   C[i][j+1].parent_i = i; 
                C[i][j+1].parent_j = j; 
                cout<<("The destination cell is found\n"); 
                tracePath(C, dest); 
                foundDest = true; 
                return; 
            } 

            else if (closedList[i][j+1] == false && 
                     cell_unblocked (grid, i, j+1) == true) 
            { 
                gNew = C[i][j].g + 1.0; 
                hNew = manhattan_distance(i, j+1, dest); 
                fNew = gNew +(weight* hNew); 

                if (C[i][j+1].f == FLT_MAX || 
                        C[i][j+1].f > fNew) 
                { 
                    openList.insert( make_pair(fNew, 
                                        make_pair (i, j+1))); 
  
                    C[i][j+1].f = fNew; 
                    C[i][j+1].g = gNew; 
                    C[i][j+1].h = hNew; 
                    C[i][j+1].parent_i = i; 
                    C[i][j+1].parent_j = j; 
                } 
            } 
        }
        if (cell_valid(i, j-1) == true) 
        {
        if (cell_destination(i, j-1, dest) == true) 
            { 
                C[i][j-1].parent_i = i; 
                C[i][j-1].parent_j = j; 
                cout<<("The destination cell is found\n"); 
                tracePath(C, dest); 
                foundDest = true; 
                return; 
            } 

            else if (closedList[i][j-1] == false && 
                     cell_unblocked(grid, i, j-1) == true) 
            { 
                gNew = C[i][j].g + 1.0; 
                hNew = manhattan_distance(i, j-1, dest); 
                fNew = gNew +(weight*hNew); 
  
                if (C[i][j-1].f == FLT_MAX || 
                        C[i][j-1].f > fNew) 
                { 
                    openList.insert( make_pair (fNew, make_pair (i, j-1))); 
                    C[i][j-1].f = fNew; 
                    C[i][j-1].g = gNew; 
                    C[i][j-1].h = hNew; 
                    C[i][j-1].parent_i = i; 
                    C[i][j-1].parent_j = j; 
                } 
         }
         }
       if (cell_valid(i-1, j+1) == true)
       {
        if (cell_destination(i-1, j+1, dest) == true) 
            {   C[i-1][j+1].parent_i = i; 
                C[i-1][j+1].parent_j = j; 
                cout<<("The destination cell is found\n"); 
                tracePath (C, dest); 
                foundDest = true; 
                return; 
            } 
  
            else if (closedList[i-1][j+1] == false && 
                     cell_unblocked(grid, i-1, j+1) == true) 
            { 
                gNew = C[i][j].g + 1.414; 
                hNew = manhattan_distance(i-1, j+1, dest); 
                fNew = gNew +(weight* hNew); 
  
                if (C[i-1][j+1].f == FLT_MAX || 
                        C[i-1][j+1].f > fNew) 
                { 
                    openList.insert( make_pair (fNew,  
                                    make_pair(i-1, j+1))); 
  
                 
                    C[i-1][j+1].f = fNew; 
                    C[i-1][j+1].g = gNew; 
                    C[i-1][j+1].h = hNew; 
                    C[i-1][j+1].parent_i = i; 
                    C[i-1][j+1].parent_j = j; 
                } 
            } 
       }
       if (cell_valid(i-1, j-1) == true) 
       {
        if (cell_destination (i-1, j-1, dest) == true)     
              { C[i-1][j-1].parent_i = i; 
                C[i-1][j-1].parent_j = j; 
                cout<<("The destination cell is found\n"); 
                tracePath (C, dest); 
                foundDest = true; 
                return; 
            } 

            else if (closedList[i-1][j-1] == false && 
                     cell_unblocked(grid, i-1, j-1) == true) 
            { 
                gNew = C[i][j].g + 1.414; 
                hNew = manhattan_distance(i-1, j-1, dest); 
                fNew = gNew +(weight* hNew); 

                if (C[i-1][j-1].f == FLT_MAX || 
                        C[i-1][j-1].f > fNew) 
                { 
                    openList.insert( make_pair (fNew, make_pair (i-1, j-1)));  
                    C[i-1][j-1].f = fNew; 
                    C[i-1][j-1].g = gNew; 
                    C[i-1][j-1].h = hNew; 
                    C[i-1][j-1].parent_i = i; 
                    C[i-1][j-1].parent_j = j; 
                } 
            } 
       }
       if (cell_valid(i+1, j+1) == true) 
       {
        if (cell_destination(i+1, j+1, dest) == true) 
            {   C[i+1][j+1].parent_i = i; 
                C[i+1][j+1].parent_j = j; 
                cout<<("The destination cell is found\n"); 
                tracePath (C, dest); 
                foundDest = true; 
                return; 
            } 
  
         
            else if (closedList[i+1][j+1] == false && 
                     cell_unblocked(grid, i+1, j+1) == true) 
            { 
                gNew = C[i][j].g + 1.414; 
                hNew = manhattan_distance(i+1, j+1, dest); 
                fNew = gNew +(weight*hNew); 
  
                if (C[i+1][j+1].f == FLT_MAX || 
                        C[i+1][j+1].f > fNew) 
                { 
                    openList.insert(make_pair(fNew,  
                                        make_pair (i+1, j+1))); 
                    C[i+1][j+1].f = fNew; 
                    C[i+1][j+1].g = gNew; 
                    C[i+1][j+1].h = hNew; 
                    C[i+1][j+1].parent_i = i; 
                    C[i+1][j+1].parent_j = j; 
                } 
            } 
       }
       if (cell_valid(i+1, j-1) == true) 
       {
        if (cell_destination(i+1, j-1, dest) == true) 
             {   C[i+1][j-1].parent_i = i; 
                C[i+1][j-1].parent_j = j; 
                cout<<("The destination cell is found\n"); 
                tracePath(C, dest); 
                foundDest = true; 
                return; 
            } 
  
            else if (closedList[i+1][j-1] == false && 
                     cell_unblocked(grid, i+1, j-1) == true) 
            { 
                gNew = C[i][j].g + 1.414; 
                hNew = manhattan_distance(i+1, j-1, dest); 
                fNew = gNew +(weight*hNew);

                if (C[i+1][j-1].f == FLT_MAX || 
                        C[i+1][j-1].f > fNew) 
                { 
                    openList.insert(make_pair(fNew, make_pair(i+1, j-1)));  
                    C[i+1][j-1].f = fNew; 
                    C[i+1][j-1].g = gNew; 
                    C[i+1][j-1].h = hNew; 
                    C[i+1][j-1].parent_i = i; 
                    C[i+1][j-1].parent_j = j; 
                } 
            } 
        } 
    }
    if (foundDest == false) 
        cout<<("Destination not found"); 
  
    return; 
}

 
void a2StarSearch(int grid[][COL], Pair source, Pair dest, double weight) 
{   


    if (cell_destination(source.first, source.second, dest) == true) 
    { 
        return; 
    } 
    bool closedList[ROW][COL]; 
    memset(closedList, false, sizeof (closedList)); 
    cell C[ROW][COL]; 
    int i, j; 
    for (i=0; i<ROW; i++) 
    { 
        for (j=0; j<COL; j++) 
        { 
            C[i][j].f = FLT_MAX; 
            C[i][j].g = FLT_MAX; 
            C[i][j].h = FLT_MAX; 
            C[i][j].parent_i = -1; 
            C[i][j].parent_j = -1; 
        } 
    } 
    i = source.first, j = source.second; 
    C[i][j].f = 0.0; 
    C[i][j].g = 0.0; 
    C[i][j].h = 0.0; 
    C[i][j].parent_i = i; 
    C[i][j].parent_j = j; 
  
    set<pPair> openList; 
    openList.insert(make_pair (0.0, make_pair (i, j))); 
    bool foundDest = false; 
    double gNew, hNew, fNew; 
    while (!openList.empty()) 
    { 
        pPair p = *openList.begin();
        openList.erase(openList.begin()); 
        i = p.second.first; 
        j = p.second.second; 
        closedList[i][j] = true; 
       if (cell_valid(i-1, j) == true) 
       { 
        if (cell_destination(i-1, j, dest) == true) 
            {   C[i-1][j].parent_i = i; 
                C[i-1][j].parent_j = j; 
                cout<<("The destination cell is found\n"); 
                tracePath (C, dest); 
                foundDest = true; 
                return; 
            } 
            else if (closedList[i-1][j] == false && 
                     cell_unblocked(grid, i-1, j) == true) 
            { 
                gNew = C[i][j].g + 1.0; 
                hNew = diagonal_distance (i-1, j, dest); 
                fNew = gNew + (weight*hNew); 
                if (C[i-1][j].f == FLT_MAX || C[i-1][j].f > fNew) 
                { 
                    openList.insert( make_pair(fNew,make_pair(i-1, j))); 
                    C[i-1][j].f = fNew; 
                    C[i-1][j].g = gNew; 
                    C[i-1][j].h = hNew; 
                    C[i-1][j].parent_i = i; 
                    C[i-1][j].parent_j = j; 
                } 
            }  
       }
       if (cell_valid(i+1, j) == true) 
        { 

        if (cell_destination(i+1, j, dest) == true) 
            {   C[i+1][j].parent_i = i; 
                C[i+1][j].parent_j = j; 
                cout<<("The destination cell is found\n"); 
                tracePath(C, dest); 
                foundDest = true; 
                return; 
            } 
            else if (closedList[i+1][j] == false && 
                     cell_unblocked(grid, i+1, j) == true) 
            { 
                gNew = C[i][j].g + 1.0; 
                hNew = diagonal_distance(i+1, j, dest); 
                fNew = gNew + (weight*hNew); 

                if (C[i+1][j].f == FLT_MAX || C[i+1][j].f > fNew) 
                { 
                    openList.insert( make_pair (fNew, make_pair (i+1, j))); 
                   
                    C[i+1][j].f = fNew; 
                    C[i+1][j].g = gNew; 
                    C[i+1][j].h = hNew; 
                    C[i+1][j].parent_i = i; 
                    C[i+1][j].parent_j = j; 
                } 
            } 
        }
        if (cell_valid(i, j+1) == true) 
        {
        if (cell_destination(i, j+1, dest) == true) 
            {   C[i][j+1].parent_i = i; 
                C[i][j+1].parent_j = j; 
                cout<<("The destination cell is found\n"); 
                tracePath(C, dest); 
                foundDest = true; 
                return; 
            } 

            else if (closedList[i][j+1] == false && 
                     cell_unblocked (grid, i, j+1) == true) 
            { 
                gNew = C[i][j].g + 1.0; 
                hNew = diagonal_distance (i, j+1, dest); 
                fNew = gNew + (weight*hNew); 

                if (C[i][j+1].f == FLT_MAX || C[i][j+1].f > fNew) 
                { 
                    openList.insert( make_pair(fNew, 
                                        make_pair (i, j+1))); 
                    C[i][j+1].f = fNew; 
                    C[i][j+1].g = gNew; 
                    C[i][j+1].h = hNew; 
                    C[i][j+1].parent_i = i; 
                    C[i][j+1].parent_j = j; 
                } 
            } 
        }
        if (cell_valid(i, j-1) == true) 
        {
        if (cell_destination(i, j-1, dest) == true) 
            { 
                C[i][j-1].parent_i = i; 
                C[i][j-1].parent_j = j; 
                cout<<("The destination cell is found\n"); 
                tracePath(C, dest); 
                foundDest = true; 
                return; 
            } 

            else if (closedList[i][j-1] == false && 
                     cell_unblocked(grid, i, j-1) == true) 
            { 
                gNew = C[i][j].g + 1.0; 
                hNew = diagonal_distance(i, j-1, dest); 
                fNew = gNew + (weight*hNew); 
  
                if (C[i][j-1].f == FLT_MAX || 
                        C[i][j-1].f > fNew) 
                { 
                    openList.insert( make_pair (fNew, make_pair (i, j-1))); 
                    C[i][j-1].f = fNew; 
                    C[i][j-1].g = gNew; 
                    C[i][j-1].h = hNew; 
                    C[i][j-1].parent_i = i; 
                    C[i][j-1].parent_j = j; 
                } 
         }
         }
       if (cell_valid(i-1, j+1) == true)
       {
        if (cell_destination(i-1, j+1, dest) == true) 
            {   C[i-1][j+1].parent_i = i; 
                C[i-1][j+1].parent_j = j; 
                cout<<("The destination cell is found\n"); 
                tracePath (C, dest); 
                foundDest = true; 
                return; 
            } 
  
            else if (closedList[i-1][j+1] == false && 
                     cell_unblocked(grid, i-1, j+1) == true) 
            { 
                gNew = C[i][j].g + 1.414; 
                hNew = diagonal_distance(i-1, j+1, dest); 
                fNew = gNew +(weight*hNew);
  
                if (C[i-1][j+1].f == FLT_MAX || 
                        C[i-1][j+1].f > fNew) 
                { 
                    openList.insert( make_pair (fNew,  
                                    make_pair(i-1, j+1))); 
  
                 
                    C[i-1][j+1].f = fNew; 
                    C[i-1][j+1].g = gNew; 
                    C[i-1][j+1].h = hNew; 
                    C[i-1][j+1].parent_i = i; 
                    C[i-1][j+1].parent_j = j; 
                } 
            } 
       }
       if (cell_valid(i-1, j-1) == true) 
       {
        if (cell_destination (i-1, j-1, dest) == true)     
              { C[i-1][j-1].parent_i = i; 
                C[i-1][j-1].parent_j = j; 
                cout<<("The destination cell is found\n"); 
                tracePath (C, dest); 
                foundDest = true; 
                return; 
            } 

            else if (closedList[i-1][j-1] == false && 
                     cell_unblocked(grid, i-1, j-1) == true) 
            { 
                gNew = C[i][j].g + 1.414; 
                hNew = diagonal_distance(i-1, j-1, dest); 
                fNew = gNew +(weight*hNew);

                if (C[i-1][j-1].f == FLT_MAX || 
                        C[i-1][j-1].f > fNew) 
                { 
                    openList.insert( make_pair (fNew, make_pair (i-1, j-1)));  
                    C[i-1][j-1].f = fNew; 
                    C[i-1][j-1].g = gNew; 
                    C[i-1][j-1].h = hNew; 
                    C[i-1][j-1].parent_i = i; 
                    C[i-1][j-1].parent_j = j; 
                } 
            } 
       }
       if (cell_valid(i+1, j+1) == true) 
       {
        if (cell_destination(i+1, j+1, dest) == true) 
            {   C[i+1][j+1].parent_i = i; 
                C[i+1][j+1].parent_j = j; 
                cout<<("The destination cell is found\n"); 
                tracePath (C, dest); 
                foundDest = true; 
                return; 
            } 
  
         
            else if (closedList[i+1][j+1] == false && 
                     cell_unblocked(grid, i+1, j+1) == true) 
            { 
                gNew = C[i][j].g + 1.414; 
                hNew = diagonal_distance(i+1, j+1, dest); 
                fNew = gNew +(weight*hNew) ;
  
                if (C[i+1][j+1].f == FLT_MAX || 
                        C[i+1][j+1].f > fNew) 
                { 
                    openList.insert(make_pair(fNew,  
                                        make_pair (i+1, j+1))); 
                    C[i+1][j+1].f = fNew; 
                    C[i+1][j+1].g = gNew; 
                    C[i+1][j+1].h = hNew; 
                    C[i+1][j+1].parent_i = i; 
                    C[i+1][j+1].parent_j = j; 
                } 
            } 
       }
       if (cell_valid(i+1, j-1) == true) 
       {
        if (cell_destination(i+1, j-1, dest) == true) 
             {   C[i+1][j-1].parent_i = i; 
                C[i+1][j-1].parent_j = j; 
                cout<<("The destination cell is found\n"); 
                tracePath(C, dest); 
                foundDest = true; 
                return; 
            } 
  
            else if (closedList[i+1][j-1] == false && 
                     cell_unblocked(grid, i+1, j-1) == true) 
            { 
                gNew = C[i][j].g + 1.414; 
                hNew = diagonal_distance(i+1, j-1, dest); 
                fNew = gNew +(weight*hNew);

                if (C[i+1][j-1].f == FLT_MAX || 
                        C[i+1][j-1].f > fNew) 
                { 
                    openList.insert(make_pair(fNew, make_pair(i+1, j-1)));  
                    C[i+1][j-1].f = fNew; 
                    C[i+1][j-1].g = gNew; 
                    C[i+1][j-1].h = hNew; 
                    C[i+1][j-1].parent_i = i; 
                    C[i+1][j-1].parent_j = j; 
                } 
            } 
        } 
    }
    if (foundDest == false) 
        cout<<("Destination not found"); 
  
    return; 
}

  
int main() 
{  
    int grid[ROW][COL] = 
    { 
        { 1, 0, 1, 1, 1}, 
        { 1, 1, 1, 0, 1}, 
        { 1, 1, 1, 0, 1}, 
        { 1, 0, 1, 0, 1},
        { 1, 1, 1, 0, 1} 
    }; 
    int choice, n;
    Pair source = make_pair(0, 0); 
    Pair dest1= make_pair(4, 2); 
    Pair dest=make_pair(1,1);
    cout<<"enter the number of destinations";
    cin>>n;
    cout<<("enter your heuristics distance choice \n 1. Euclidian \n 2. Manhattan \n 3. Diagonal");
    cin>>choice;
    double weight;
    cout<<"enter the weight";
    cin>>weight;
    switch(choice)
    { case 1: if(n==2)
              {   if(dest.first>dest1.first)
                 {  if(dest.second>dest1.second)
                      {aStarSearch(grid, source, dest1,weight);
                       aStarSearch(grid, source, dest,weight);
                      }
                 }
                 else {
                       aStarSearch(grid, source, dest,weight);
                       aStarSearch(grid, source, dest1,weight);
                      }
              } 
              else 
              aStarSearch(grid, source, dest,weight);
              break;
      case 2: if(n==2)
              {   if(dest.first>dest1.first)
                 {  if(dest.second>dest1.second)
                      {a1StarSearch(grid, source, dest1,weight);
                       a1StarSearch(grid, source, dest,weight);
                      }
                 }
                 else {
                       a1StarSearch(grid, source, dest,weight);
                       a1StarSearch(grid, source, dest1,weight);
                      }
              } 
              else 
              a1StarSearch(grid, source, dest,weight);
              break;
      case 3: if(n==2)
              {   if(dest.first>dest1.first)
                 {  if(dest.second>dest1.second)
                      {a2StarSearch(grid, source, dest1,weight);
                       a2StarSearch(grid, source, dest,weight);
                      }
                 }
                 else {
                       a2StarSearch(grid, source, dest,weight);
                       a2StarSearch(grid, source, dest1,weight);
                      }
              } 
              else 
              a2StarSearch(grid, source, dest,weight);
              break;
      default: cout<<("enter a valid choice");
              break;
     }
    

    return(0); 
}