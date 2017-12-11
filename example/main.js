/**
 * Created by Administrator on 2017/8/12.
 */

var countLoad=0

function lookAt(tM, lAt) {
    lAt = lAt.subtract(tM.position);
    tM.rotation.y = -Math.atan2(lAt.z, lAt.x) - Math.PI/2;
}

var models=[
   {"fileSrc":"../example/model/fps_q1_1/", "fileName":"fps_q1_1.babylon","pName":"M60机关枪","mAttr":1,"position":new BABYLON.Vector3(0, 0, 0.5),"rotation": new BABYLON.Vector3(0, Math.PI, 0)},
    {"fileSrc":"../example/model/fps_q2_1/", "fileName":"fps_q2_1.babylon","pName":"手枪","mAttr":1,"position":new BABYLON.Vector3(0, 0, 0.1),"rotation":new BABYLON.Vector3(0, Math.PI, 0)},
   {"fileSrc":"../example/model/fps_q3_2/", "fileName":"fps_q3_2.babylon","pName":"光剑","mAttr":1,"position":new BABYLON.Vector3(0, 0, 0.3),"rotation":new BABYLON.Vector3(0, Math.PI, 0)},
]

var fps_D=[]

function loadMeshes(models,sccuess){

    var countMesh=0;
    models.forEach(function (model,i){
        BABYLON.SceneLoader.ImportMesh("", model.fileSrc, model.fileName, scene, function(newMeshes,particleSystems,skeletons) {

            countLoad++

            fps_D[i] = BABYLON.Mesh.CreateBox("crate", 2, scene);
            console.log(particleSystems)
            newMeshes.forEach(function(mesh){
                mesh.alwaysSelectAsActiveMesh = true;
                mesh.computeBonesUsingShaders = false;

                mesh.renderingGroupId=1

                mesh.material.subMaterials.forEach(function (mat) {
                    mat.backFaceCulling=false;
                })

                console.log(33222)
                console.log(model.mAttr)
                mesh.name=model.pName;
               // mesh.flipFaces();
                mesh.material.backFaceCulling=false;
                if(model.mAttr==1){


                    fps_D[i].material = new BABYLON.StandardMaterial("Mat", scene);
                    fps_D[i].material.alpha=0;
                    fps_D[i].scaling=new BABYLON.Vector3(-0.1,0.1,0.1)
                    fps_D[i].position = model.position;
                    fps_D[i].rotation = model.rotation;
                    fps_D[i].parent=camera;
                    fps_D[i].checkCollisions = false;
                    fps_D[i].isPickable=false
                    mesh.parent= fps_D[i]
                    mesh.isPickable=false
                   // mesh.position.z=100;
                    console.log(model.pName)
                    console.log(mesh.id)
                  //  console.log(mesh.name)
                }
            })

            countMesh++
            if(countMesh==models.length){
                sccuess()
            }
        })
    })
}




var FpsPlayAn=[


    {
        "name":"M60机关枪",
        "id":[],
        "animations":{
            //切换动画
            "show":[300,330],
            //保持动画
            "keep":[0,70],
            //攻击动画
            "do":[71,90],
            //换弹夹动画
            "reload":[125,297]
        },
        "time":[50,400]
    },
    {
        "name":"手枪",
        "id":[],
        "animations":{
            //切换动画
            "show":[214,243],
            //保持动画
            "keep":[0,50],
            //攻击动画
            "do":[83,114],
            //换弹夹动画
            "reload":[144,212]
        },
        "time":[50,100]
    },
    {
        "name":"光剑",
        "id":[],
        "animations":{
            //切换动画
            "show":[753,800],
            //保持动画
            "keep":[801,919],
            //攻击动画
            "do":[920,955],
            //换弹夹动画
            "reload":null
        },
        "time":[50,0]
    },



]

function AniFps(FpsPlayAn,i){

    var showTime;
    var doTime;

    this.keep=function(){
        var mesh=scene.getMeshByName(FpsPlayAn[i].name)
        scene.beginAnimation(mesh, FpsPlayAn[i].animations.keep[0], FpsPlayAn[i].animations.keep[1], true, 0.7);
    }
    this.do=function(){
        clearTimeout(doTime)
        var mesh=scene.getMeshByName(FpsPlayAn[i].name)
        scene.beginAnimation(mesh, FpsPlayAn[i].animations.do[0], FpsPlayAn[i].animations.do[1], false, 0.7);

        doTime=setTimeout(function(){
            scene.beginAnimation(mesh, FpsPlayAn[i].animations.keep[0], FpsPlayAn[i].animations.keep[1], true, 0.7);
        },(FpsPlayAn[i].animations.do[1]-FpsPlayAn[i].animations.do[0])*FpsPlayAn[i].time[0])

    }
    this.reload=function(){

        clearTimeout(doTime)
        var mesh=scene.getMeshByName(FpsPlayAn[i].name)
        scene.beginAnimation(mesh, FpsPlayAn[i].animations.reload[0], FpsPlayAn[i].animations.reload[1], false, 0.7);

        doTime=setTimeout(function(){
            scene.beginAnimation(mesh, FpsPlayAn[i].animations.keep[0], FpsPlayAn[i].animations.keep[1], true, 0.7);
        },(FpsPlayAn[i].animations.do[1]-FpsPlayAn[i].animations.do[0])*FpsPlayAn[i].time[1])

    }

    this.show=function(){

        clearTimeout(showTime)
        var mesh=scene.getMeshByName(FpsPlayAn[i].name)

        FpsPlayAn.forEach(function (fpsmesh) {

         //   console.log(fpsmesh.name)
            scene.getMeshByName(fpsmesh.name).visibility=0
        })

        console.log(FpsPlayAn[i].name)

        mesh.visibility=1
        scene.beginAnimation(mesh, FpsPlayAn[i].animations.show[0], FpsPlayAn[i].animations.show[1], false, 0.7);

        showTime=setTimeout(function(){
            scene.beginAnimation(mesh, FpsPlayAn[i].animations.keep[0], FpsPlayAn[i].animations.keep[1], true, 0.7);
        },(FpsPlayAn[i].animations.show[1]-FpsPlayAn[i].animations.show[0])*50)
    }

}

v_1= new AniFps(FpsPlayAn,0)
v_2= new AniFps(FpsPlayAn,1)
v_3= new AniFps(FpsPlayAn,2)

var jumpState=0
//按键绑定
function keyevent(){
    if(event.keyCode==49){
        v_1.show()
        qiangState=1
      //  setQiangState(qiangState)
        setTimeout(function(){
            hq.play()
        },500)
    }else if(event.keyCode==50){
        v_2.show()
        qiangState=2
      //  setQiangState(qiangState)
        setTimeout(function(){
            hq.play()
        },500)
    }else if(event.keyCode==51){
        v_3.show()
        qiangState=3
      //  setQiangState(qiangState)
        setTimeout(function(){
            hq.play()
        },500)
    }else if(event.keyCode==81){
        setTimeout(function(){
            hq.play()
        },500)
        if(qiangState==1){
            qiangState=2
        }else{
            qiangState=1
        }
       // setQiangState(qiangState)

    }else if(event.keyCode==82){

        //换弹夹
        if(qiangState==1){
            v_1.reload()
        }else if(qiangState==2){
            v_2.reload()
        }else if(qiangState==3){
            v_3.reload()
        }
        // setQiangState(qiangState)
    }else if(event.keyCode==32){

        if(jumpState==0){
            /* camera._localDirection.copyFromFloats(0,25,0)
             camera.getViewMatrix().invertToRef(camera._cameraTransformMatrix);
             BABYLON.Vector3.TransformNormalToRef(camera._localDirection,camera._cameraTransformMatrix,camera._transformedDirection);
             camera.cameraDirection.addInPlace(camera._transformedDirection);*/
            scene.gravity = new BABYLON.Vector3(0, 0.4, 0);

            setTimeout(function(){
                scene.gravity = new BABYLON.Vector3(0, -0.2, 0);
            },100)

            jumpState=1
            setTimeout(function(){
                scene.gravity = new BABYLON.Vector3(0, -0.2, 0);
                jumpState=0
            },500)
        }

    }/*else if(event.keyCode==16){
        camera.ellipsoid.y=camera.ellipsoid.y/2;
        camera.speed=camera.speed/2
    }*/


}

function keyevent2(){
    /*if(event.keyCode==16){
        camera.position.y+=camera.ellipsoid.y*2;
        camera.ellipsoid.y=camera.ellipsoid.y*2;
        camera.speed=camera.speed*2
    }*/
}

//枪得状态
function setQiangState(qiangState){
    if(qiangState==1){

        scene.getMeshByID("66b54ec6-cd3b-47ba-96b6-e09c26c35dc9").visibility=0;
        scene.getMeshByID("0c00c3cf-2490-4da7-b8c2-28ba5216ba10").visibility=0;

        scene.getMeshByID("1ea0aafd-8f1a-4d57-bd34-3542b5a7baed").visibility=1;
        scene.getMeshByID("7270915d-8281-4797-a173-3a06ef9a6418").visibility=1;

        ready = scene.beginAnimation(scene.getMeshByID("1ea0aafd-8f1a-4d57-bd34-3542b5a7baed"), 10, 60, false);
        ready2 = scene.beginAnimation(scene.getMeshByID("7270915d-8281-4797-a173-3a06ef9a6418"), 10, 60, false);
    }else{

        scene.getMeshByID("1ea0aafd-8f1a-4d57-bd34-3542b5a7baed").visibility=0;
        scene.getMeshByID("7270915d-8281-4797-a173-3a06ef9a6418").visibility=0;

        scene.getMeshByID("66b54ec6-cd3b-47ba-96b6-e09c26c35dc9").visibility=1;
        scene.getMeshByID("0c00c3cf-2490-4da7-b8c2-28ba5216ba10").visibility=1;
        ready_2 = scene.beginAnimation(scene.getMeshByID("66b54ec6-cd3b-47ba-96b6-e09c26c35dc9"), 10, 50, false);
        ready2_2 = scene.beginAnimation(scene.getMeshByID("0c00c3cf-2490-4da7-b8c2-28ba5216ba10"), 10, 50, false);

    }
}


//枪口火焰
function freeHuoConstructor(mesh){

    // Create a particle system
    var particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);

    //Texture of each particle
    particleSystem.particleTexture = new BABYLON.Texture("../images/boom.png", scene);

    // Where the particles come from
    particleSystem.emitter = mesh; // the starting object, the emitter
    particleSystem.maxEmitBox = new BABYLON.Vector3(0, 0, 0); // To...
    particleSystem.minEmitBox = new BABYLON.Vector3(0, -0, -0); // To...

    // Colors of all particles
    particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 0.5);
    particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 0.5);
    particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0);

    // Size of each particle (random between...
    particleSystem.minSize =0.5;
    particleSystem.maxSize = 0.8;

    // Life time of each particle (random between...
    particleSystem.minLifeTime = 0.0001;
    particleSystem.maxLifeTime = 0.0001;

    // Emission rate
    particleSystem.emitRate = 150;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
  //  particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);

    // Direction of each particle after it has been emitted
    particleSystem.direction1 = new BABYLON.Vector3(-0, -0, 1000);
    particleSystem.direction2 = new BABYLON.Vector3(0, 0, 1000);

    // Angular speed, in radians
    particleSystem.minAngularSpeed = 0;
    particleSystem.maxAngularSpeed = Math.PI;

    // Speed
    particleSystem.minEmitPower = 1;
    particleSystem.maxEmitPower = 3;
    particleSystem.updateSpeed = 5;

    // Start the particle system
    this.start=function(){
        particleSystem.start();
    }

    this.stop=function(){
        console.log("stop")
        particleSystem.stop();
    }

}

//雨雪
function Yu(mesh){

    // Create a particle system
    var particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);

    //Texture of each particle
    particleSystem.particleTexture = new BABYLON.Texture("../images/yun.png", scene);

    // Where the particles come from
    particleSystem.emitter = mesh; // the starting object, the emitter
    particleSystem.maxEmitBox = new BABYLON.Vector3(150, 150, 150); // To...
    particleSystem.minEmitBox = new BABYLON.Vector3(-150, -150, -150); // To...

    // Colors of all particles
    particleSystem.color1 = new BABYLON.Color4(1, 1, 1, 1);
    particleSystem.color2 = new BABYLON.Color4(1,1, 1.0, 1);
    particleSystem.colorDead = new BABYLON.Color4(1, 1, 1, 1);

    // Size of each particle (random between...
    particleSystem.minSize =1;
    particleSystem.maxSize = 4;

    // Life time of each particle (random between...
    particleSystem.minLifeTime = 0.4;
    particleSystem.maxLifeTime = 5;

    // Emission rate
    particleSystem.emitRate = 900;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;

    // Set the gravity of all particles
    particleSystem.gravity = new BABYLON.Vector3(0, -100, 0);

    // Direction of each particle after it has been emitted
    particleSystem.direction1 = new BABYLON.Vector3(-2, -2, -2);
    particleSystem.direction2 = new BABYLON.Vector3(2, -2, 2);

    // Angular speed, in radians
    particleSystem.minAngularSpeed = 0;
    particleSystem.maxAngularSpeed = Math.PI;

    // Speed
    particleSystem.minEmitPower = 10;
    particleSystem.maxEmitPower = 30;
    particleSystem.updateSpeed = 0.009;

    // Start the particle system
    this.start=function(){
        particleSystem.start();
    }

    this.stop=function(){
        particleSystem.stop();
    }

}

//枪孔爆炸烟雾
function setBooms(position){
    var fountain = BABYLON.Mesh.CreateBox("fountain", 1.0, scene);
    fountain.isPickable=false
    fountain.visibility=0;
    fountain.rotation.x=Math.PI*0.9;
    var particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);

    //粒子的纹理
    particleSystem.particleTexture = new BABYLON.Texture("../images/yun.png", scene);

    //颜色过滤
    //  particleSystem.textureMask = new BABYLON.Color4(1, 1, 1 ,1.0);


    //定义发射器
    particleSystem.emitter = fountain; // the starting object, the emitter, a box in this case.

    particleSystem.minEmitBox = new BABYLON.Vector3(0, 0, 0); // Starting all From

    particleSystem.color1 = new BABYLON.Color4(0.8, 0.8, 0.8, 1);
    particleSystem.color2 = new BABYLON.Color4(0.8,0.8, 0.8, 1);
    particleSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0);

    particleSystem.minSize = 0.2;
    particleSystem.maxSize = 1;

    // console.log(particleSystem)

    particleSystem.minLifeTime = 6;
    particleSystem.maxLifeTime = 6;

    particleSystem.emitRate = 5;

    // particleSystem.manualEmitCount = 300;

    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;


    particleSystem.direction1 = new BABYLON.Vector3(0, -0.4, 0);
    // particleSystem2.direction2 = new BABYLON.Vector3(0, 100, 0);



    // Speed
    particleSystem.minEmitPower = 1;
    particleSystem.maxEmitPower = 1;
    particleSystem.updateSpeed = 100;


    particleSystem.stop();

    this.start=function(){
        particleSystem.start();
    }

    this.stop=function(){
        particleSystem.stop();
    }
    this.Position=function(position){
        fountain.position=position;
    }

    fountain.position=position;
    // fountain.rotation=rotation;
}

//喷射血液
function Xues(position){
    var fountain = BABYLON.Mesh.CreateBox("fountain", 1.0, scene);
    fountain.isPickable=false
    fountain.visibility=0;
    fountain.rotation.x=Math.PI*0.9;
    var particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);

    //粒子的纹理
    particleSystem.particleTexture = new BABYLON.Texture("../images/yun.png", scene);

    //颜色过滤
    //  particleSystem.textureMask = new BABYLON.Color4(1, 1, 1 ,1.0);


    //定义发射器
    particleSystem.emitter = fountain; // the starting object, the emitter, a box in this case.

    particleSystem.minEmitBox = new BABYLON.Vector3(0, 0, 0); // Starting all From

    particleSystem.color1 = new BABYLON.Color4(.8, 0, 0 ,1.0);
    particleSystem.color2 = new BABYLON.Color4(.8, 0, 0 ,1.0);
    particleSystem.colorDead = new BABYLON.Color4(.8, 0, 0 ,0);

    particleSystem.minSize = .2;
    particleSystem.maxSize = 1;

    // console.log(particleSystem)

    particleSystem.minLifeTime = 6;
    particleSystem.maxLifeTime = 6;

    particleSystem.emitRate = 5;

    // particleSystem.manualEmitCount = 300;

    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;


    particleSystem.direction1 = new BABYLON.Vector3(0.2, 0.3, 0.2);
    // particleSystem2.direction2 = new BABYLON.Vector3(0, 100, 0);



    // Speed
    particleSystem.minEmitPower = 1;
    particleSystem.maxEmitPower = 1;
    particleSystem.updateSpeed = 100;


    particleSystem.stop();

    this.start=function(){
        particleSystem.start();
    }

    this.stop=function(){
        particleSystem.stop();
    }
    this.Position=function(position){
        fountain.position=position;
    }

    fountain.position=position;
    // fountain.rotation=rotation;
}