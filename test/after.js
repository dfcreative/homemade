
/* Simple test of precompiler */
a

b
//========================= INCLUDES ========================
//---------- Wrong include
//HOMEMADE ERROR: Include failed. Can't find the file "test\hello_world.js"
//--------------------
c
//----------- Correct include 1
/*
First text being included.
*/
d
e
//------------ Correct include 2
console.log("Include2 ready some");
f
g
//------------- Recursive include
// #include incs/include3.js //Include header
h
i
j
//===================== ECHOES ================
2
k

l
;;

m
var a = '123';
n
var b = ok?
o
4
p
//test undefineds not to be removed
if (to.y !== undefined) this.top = to.y;
if (to.x !== undefined) this.left = to.x;
q
r
//===================== Conditions =======================

s
//---------Ifdef test
t	1st condition (correct)
u
v
//-----------Ifndef test
4th condition (correct)
w
x
//------------Evaluable condition
2 (correct)
y
z
//-------------Elifs
true: 5 (correct)
//-------------excludes

Excludes ok