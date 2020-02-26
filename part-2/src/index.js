const fs = require('fs');
const _ = require('lodash')
const request = require('request');

fs.readFile('../input/input-dump', {}, (error, data) => {
    if (error)
        console.log(error)
    else {
        let file = Buffer.from(data).toString('ascii').split('\n');

        var objs = []

        file.map((x, index) => {
            if (x.indexOf('{') > -1)
                try {
                    var obj = JSON.parse('{' + x.split('{')[1]);
                    if (obj)
                        objs.push(obj)
                } catch (ex) {
                    if (index > 0) {
                        console.log(ex.message)
                    }
                }
        })

        objs = _.orderBy(objs, ['productId', 'image'], ['asc'])

        let listaObjsTratamento = {};

        objs.map(x => {
            listaObjsTratamento[x.productId] = _.get(listaObjsTratamento, x.productId, []);
            if (listaObjsTratamento[x.productId].length < 3) {
                // console.log(x.image)
                request(x.image, { json: true }, (err, res, body) => {
                    if (err) {
                        // return console.log('erro');
                    }
                    if (res && res.statusCode == 200) {
                        if (listaObjsTratamento[x.productId].length < 3) {
                            listaObjsTratamento[x.productId].push(x.image)
                        }
                    }
                });
            }
        })
        let listaObjsFinal = [];

        Object.keys(listaObjsTratamento).map(x => {
            listaObjsFinal.push({ productId: x, images: listaObjsTratamento[x] })
        })

        fs.writeFile("../output", JSON.stringify(listaObjsFinal), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
    }
})