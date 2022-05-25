const { Router } = require('express');
const { Op, Pet, Category, Photo, Status, Tag } = require('../db.js');

const router = Router();


module.exports = router;

router.post("/", async(req,res,next)=>{
    const {id, category, name, photoUrls, tags, status} = req.body;
    const EnumStatus = ["available","pending","sold"]
    try {
        if(!name || !photoUrls){res.status(400).send({msg:"Invalid Input"})}
        else if(status && !EnumStatus.includes(status)) return res.status(400).send({msg:"Error, wrong status"})
        else{
            let pet = await Pet.findOrCreate({where:{id}, defaults:{name}});
            if(pet[1]===false) return res.status(400).send({msg:"Pet already exist"})
            
            Promise.all(photoUrls.map( e => Photo.findOrCreate({where:{photoUrls:e}})))
                .then(res => pet[0].addPhotos(res.map(e=> e[0])))
                .then(()=>{
                    if(category) {
                        Category.findOrCreate({where: {name:category.name}, /*defaults:{id:category.id}*/})//evitar conflicto de id's
                        .then(petCategory => petCategory[0].addPets(pet[0]))
                    }
                })
                .then(()=>{
                    if(status){
                        Status.findOne({where:{status}})
                        .then((petStatus)=>petStatus.addPets(pet[0]))
                    }
                })
                .then(()=>{
                    if(tags){
                        Promise.all(tags.map(e => Tag.findOrCreate({where:{name:e.name}})))
                        .then(res => pet[0].addTags(res.map(e=>e[0])))
                    }
                })
                .then(()=>res.send(pet))
                .catch((error)=>next(error))
           
        }
    } catch (error) {
        next(error)
    }
})


router.get("/findByStatus",(req,res)=>{
    const {status} = req.query;
    status?res.send(status):res.send("no")
})

router.get("/:id",async (req,res, next)=>{
    const {id} = req.params;

    try {
        let pet = await Pet.findOne({where:{id}})
        if(pet) return res.send(pet)
        res.status(404).send({msg:"Not found"})
    } catch (error) {
        next(error)
    }
})