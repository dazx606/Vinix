const { Router } = require('express');
const { Op, Pet, Category, Photo, Status, Tag } = require('../db.js');

const router = Router();


module.exports = router;

router.post("/", async(req,res,next)=>{
    const {id, category, name, photoUrls, tags, status} = req.body;
    const EnumStatus = ["available","pending","sold"]
    try {
        if(!name || !photoUrls){res.status(405).send({msg:"Invalid Input"})}
        else if(status && !EnumStatus.includes(status)) return res.status(405).send({msg:"Error, wrong status"})
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
                .then(()=>res.send({msg:"done",pet}))
                .catch((error)=>next(error))
           
        }
    } catch (error) {
        next(error)
    }
});

router.patch("/", async(req,res,next)=>{
    const {id, name, category, status} = req.body;
    const EnumStatus = ["available","pending","sold"]
    try {
        if(!id || typeof(id)!=="number") return res.status(400).send({msg:"Invalid ID supplied"})
        let pet = await Pet.findOne({where:{id:id}})
        if(!pet) return res.status(404).send({msg:"Pet not found"})
        if(status && !EnumStatus.includes(status)) return res.status(400).send({msg:"Invalid STATUS supplied"})
        Pet.update({name},{where:{id}});
        if(category){
            let petCategory = await Category.findOrCreate({where:{name:category.name}});
            pet.setCategory(petCategory[0]);
        }
        if(status){
            let petStatus = await Status.findOne({where:{status}});
            pet.setStatus(petStatus);
        }
        res.send({msg:"Pet edited"})

    } catch (error) {
        next(error)
    }
})


router.get("/findByStatus",async (req,res,next)=>{
    const {status} = req.query;
    const EnumStatus = ["available","pending","sold"]
    try {
        if(!EnumStatus.includes(status)) return res.status(405).send({msg:"Error, wrong status"})
        let petStatus = await Status.findOne({where:{status}})
        res.send(await petStatus.getPets())
    } catch (error) {
        next(error)
    }
});

router.get("/", async(req,res,next)=>{
    try {
        let pets = await Pet.findAll({include: [Tag, Photo]})
        res.send(pets)
    } catch (error) {
        next(error)
    }
})


router.get("/:id",async (req,res, next)=>{
    const {id} = req.params;

    try {
        let pet = await Pet.findOne({where:{id}})
        if(pet) {
            let images = await pet.getPhotos()
            let tags = await pet.getTags()
            tags = tags.map(e=>e.name)
            return res.send({pet,images, tags})
        }
        res.status(404).send({msg:"Not found"})
    } catch (error) {
        next(error)
    }
});

router.delete("/:id",async (req,res, next)=>{
    const {id} = req.params;

    try {
        let pet = await Pet.findOne({where:{id}})
        if(pet) {
            Pet.destroy({where:{id}})
            res.send({msg:"Deleted"})
        }
        else res.status(404).send({msg:"Not found"})
    } catch (error) {
        next(error)
    }
});