import PowerCut from "../model/PowerCut"
import Area from "../model/Area"

exports.addPowerCut = function(req, res, next){
    let start_date = req.body.start_date;
    let end_date = req.body.end_date;
    let description = req.body.description;
    let area_names = req.body.areas;
    let areas = [];

    console.log(new PowerCut().generateSchema());

    for(let i=0; i<area_names.length; i++){
        Area.find({name:area_names[i]}, function(err, result){
            areas.push(result[0].id);
            if(i===area_names.length-1){
                // After all the area_ids are taken

                //let powerCut = new PowerCut();
                //powerCut.createObject(start_date, end_date, description, areas);
                //powerCut.save(function(err){
                //    if (err){
                //        console.log("Insert Error : "+err);
                //    }
                //});
            }
        });
    }
};