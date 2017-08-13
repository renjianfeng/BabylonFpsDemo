/**
 * Created by Administrator on 2017/8/12.
 */
function lookAt(tM, lAt) {
    lAt = lAt.subtract(tM.position);
    tM.rotation.y = -Math.atan2(lAt.z, lAt.x) - Math.PI/2;
}

//按键绑定
function keyevent(){
    if(event.keyCode==49){
        qiangState=1
        setQiangState(qiangState)
        setTimeout(function(){
            hq.play()
        },500)
    }else if(event.keyCode==50){
        qiangState=2
        setQiangState(qiangState)
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
        setQiangState(qiangState)
    }
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

    // Colors of all particles
    particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
    particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
    particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 1);

    // Size of each particle (random between...
    particleSystem.minSize =0.5;
    particleSystem.maxSize = 0.8;

    // Life time of each particle (random between...
    particleSystem.minLifeTime = 0.000001;
    particleSystem.maxLifeTime = 0.000001;

    // Emission rate
    particleSystem.emitRate = 150;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);

    // Direction of each particle after it has been emitted
    particleSystem.direction1 = new BABYLON.Vector3(-10, -1, -10);
    particleSystem.direction2 = new BABYLON.Vector3(10, 1, 10);

    // Angular speed, in radians
    particleSystem.minAngularSpeed = 0;
    particleSystem.maxAngularSpeed = Math.PI;

    // Speed
    particleSystem.minEmitPower = 1;
    particleSystem.maxEmitPower = 3;
    particleSystem.updateSpeed = 0.005;

    // Start the particle system
    this.start=function(){
        particleSystem.start();
    }

    this.stop=function(){
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
    particleSystem.color1 = new BABYLON.Color4(1, 1, 1, 0.06);
    particleSystem.color2 = new BABYLON.Color4(1,1, 1.0, 0.06);
    particleSystem.colorDead = new BABYLON.Color4(1, 1, 1, 0.0);

    // Size of each particle (random between...
    particleSystem.minSize =50;
    particleSystem.maxSize = 100;

    // Life time of each particle (random between...
    particleSystem.minLifeTime = 0.4;
    particleSystem.maxLifeTime = 5;

    // Emission rate
    particleSystem.emitRate = 9500;

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

    particleSystem.color1 = new BABYLON.Color4(.4, .4, .4 ,1.0);
    particleSystem.color2 = new BABYLON.Color4(.4, .4, .4 ,1.0);
    particleSystem.colorDead = new BABYLON.Color4(.4, .4, .4 ,0);

    particleSystem.minSize = 1;
    particleSystem.maxSize = 10;

    // console.log(particleSystem)

    particleSystem.minLifeTime = 6;
    particleSystem.maxLifeTime = 6;

    particleSystem.emitRate = 5;

    // particleSystem.manualEmitCount = 300;

    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;


    particleSystem.direction1 = new BABYLON.Vector3(0, -3, 0);
    // particleSystem2.direction2 = new BABYLON.Vector3(0, 100, 0);



    // Speed
    particleSystem.minEmitPower = 1;
    particleSystem.maxEmitPower = 1;
    particleSystem.updateSpeed = 0.1;


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

    particleSystem.minSize = 1;
    particleSystem.maxSize = 10;

    // console.log(particleSystem)

    particleSystem.minLifeTime = 6;
    particleSystem.maxLifeTime = 6;

    particleSystem.emitRate = 5;

    // particleSystem.manualEmitCount = 300;

    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;


    particleSystem.direction1 = new BABYLON.Vector3(1, 3, 1);
    // particleSystem2.direction2 = new BABYLON.Vector3(0, 100, 0);



    // Speed
    particleSystem.minEmitPower = 1;
    particleSystem.maxEmitPower = 1;
    particleSystem.updateSpeed = 0.1;


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