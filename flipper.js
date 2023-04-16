
var canvas=document.querySelector('canvas');
canvas.width=innerWidth;
canvas.height=innerHeight;

const ctx=canvas.getContext('2d');
var degrees=0;
var mouse={color:'#FF00FF'} ;
var points=[] 
const line={p:{x:200,y:500},p1:{x:300,y:500}  };
const sky=new Image(680,370);
const ball=new Balls(180,490,20)    //{x:line.p1.x+15,y:line.p1.y+15,r:15,color:'#FF00FF' };
const leftSide={p:{x:150,y:366},p1:{x:150,y:500}};
const rigthSide={p:{x:650,y:366},p1:{x:650,y:500}};
const arch={x:400,y:370,r:250,p:180};
//const smallArch={x:400,y:370,r:210,p:180}
const color='#FF00FF';
const gravity=0.06;
 const draw=(obj)=>{
ctx.beginPath(); 
ctx.moveTo(obj.p.x,obj.p.y);
ctx.lineTo(obj.p1.x,obj.p1.y)
ctx.lineWidth=3;
 ctx.stroke()
}
sky.src="./images/sky.jpg" //''
const drawArch=(obj)=>{

    var a=Math.PI;
    var pointX,pointY;
    ctx.beginPath();
//ctx.arc(400,370,340,0,Math.PI,true);
//ctx.fillStyle='#AF00F9';
for(let x=0;x<obj.p;x++){
    a+=Math.PI/obj.p
    pointX=obj.x+ obj.r*Math.cos(a);
    pointY=obj.y+obj.r*Math.sin(a)
       points.push({x:pointX,y:pointY,mass:1000 ,velocity:{x:0,y:0}})
    if(x==0){ ctx.moveTo(points[0].x,points[0].y); 
    }else{  ctx.lineTo(points[x].x,points[x].y) }
    ctx.stroke()} //if(x%2==0){ctx.strokeStyle='red'}else{ ctx.strokeStyle='green'}
  /**/

  return points
}
console.log(drawArch(arch))
const update=(obj)=>{
draw(obj)
}
window.addEventListener('keydown',(event)=>{ 

    if(event.key=='Enter') {
        degrees-=10; 
        line.p1.x=Math.cos(degrees*Math.PI/180)*100+200;
        line.p1.y=500+Math.sin(degrees*Math.PI/180)*100 ;
            }  
})  
     window.addEventListener('keyup',(event)=>{
        if(event.key=='Enter'){ 
             while(degrees<0){ 
                console.log( degrees)
                degrees+=1 
        line.p1.x=Math.cos(degrees*Math.PI/180)*100+200; 
        line.p1.y=500+Math.sin(degrees*Math.PI/180)*100 ; } }
    })
window.addEventListener('mousemove',(e)=>{
    for(let z=0;z<180;z++){if(z<90){
        if(mouse.x<leftSide.p.x&&mouse.y<leftSide.p1.y){
            mouse.color='#00FFFF' 
        }
        if(mouse.x<points[z].x&&mouse.y<points[z].y){ 
             mouse.color='#00FFFF'}
            else if(mouse.x>=points[z].x&&mouse.y>=points[z].y){mouse.color='#FF00FF'}
    }else{
        if(mouse.x>rigthSide.p.x&&mouse.y<rigthSide.p1.y){
            mouse.color='#FFFF00' 
        }
        if(mouse.x>points[z].x&&mouse.y<  points[z].y){
        mouse.color='#FFFF00';
     
    }else if(mouse.x>points[z].x&&mouse.y<  points[z].y){}}
        
    }
    
 mouse.x=e.clientX;
   mouse.y =e.clientY;}) 
   function Balls(x,y,r){
this.x=x;
this.y=y;
this.r=r;


this.velocity={x:0,y:-6.5}
this.mass=2;
this.draw=()=>{
     ctx.beginPath();
    ctx.arc(this.x+=this.velocity.x,this.y+=this.velocity.y+=gravity,this.r,0,2*Math.PI,true);
    ctx.strokeStyle=color;
    ctx.stroke();
}
this.update=()=>{
    this.draw()
    for(let z=0;z<=179;z++){
        if(z<89){
            if(this.x-this.r<=points[z].x&&this.y-this.r<=points[z].y){
                const res={resX:this.x+=Math.cos(Math.PI/180),
                resY:this.y+=Math.sin(Math.PI/180)}
                           //if(res.resY<=140){this.velocity.y=0};return res
                       // console.log('-+-')
                             } 
        }else{

            for(let v=90;v<=179;v++){
                if(this.x-this.radius>points[v].x&&this.y-this.radius<=points[v].y){
                    const res={resX:this.x+=Math.cos(Math.PI/180),
                    resY:this.y+=Math.sin(Math.PI/180)} 
                    this.velocity.y*-1
                }
             }
        }
       
      }


}


}
//console.log(ball)

function getDistance(p,p1){
const dist=Math.sqrt(Math.pow(Math.abs(p.x-p1.x),2)+Math.pow(Math.abs(p.y-p1.y),2))
return dist
}
function getAngle(p,p1){
  return  Math.atan2(Math.abs(p.y-p1.y),Math.abs(p.x-p1.x))*180/Math.PI
}
 function rotate(velocity,angle){
    var rotatedVelocities={
        x: velocity.x*Math.cos(angle)-velocity.y*Math.sin(angle),
        y:velocity.x*Math.sin(angle)+velocity.y*Math.cos(angle)
        
    }
    return rotatedVelocities;
 }
 function resolveCollision(b1,b2){
  /* const xVelocityDist=b1.velocity.x-b2.velocity.x;
   const yVelocityDist=b1.velocity.y-b2.velocity.y;

   const xDist=b1.x-b2.x;
   const yDist=b1.y-b2.y;
if(xVelocityDist*xDist+yVelocityDist*yDist>=0){
    const angle=getAngle(b1,b2);
    b1.velocity.x=b1.x+Math.cos(angle);
     b1.velocity.y*=-1
    const m1=b1.mass;
    const m2=b2.mass;

    const u1=rotate(b1.velocity,angle);
    const u2=rotate(b2.velocity,angle);

    const v1={x:u1.x*(m1-m2)/(m1+m2)+u2.x*2*m2/(m1+m2),y:u1.y};
   // const v2={x:u2.x*(m1-m2)/(m1+m2)+u1.x*2*m2/(m1+m2),y:u2.y}

        const finalVelocity1=rotate(v1,-angle);
      //  const finalVelocity2=rotate(v2,-angle);

        b1.velocity.x=finalVelocity1.x;
        b1.velocity.y=finalVelocity1.y;
        //b2.velocity.x=finalVelocity2.x;
        //b2.velocity.y=finalVelocity1.y;
    }*/
   }
   function drawMouse(obj){
ctx.beginPath();
ctx.arc(mouse.x,mouse.y,20,0,2*Math.PI,true);
ctx.fillStyle=obj.color
ctx.fill()
}
function animate(){
 window.requestAnimationFrame(animate) 
ctx.clearRect(0,0,innerWidth,innerHeight);
drawArch(arch);
//drawArch(smallArch)
update(line);

//drawMouse(mouse);
update(leftSide);
update(rigthSide);
ball.update()
//console.log(Math.floor(getDistance(mouse,points[90])))
//console.log(getAngle(mouse,points[89]))
}
animate()
// console.log('-+-')

    
