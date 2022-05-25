'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

module.exports = async () => {
    const data = require('../../data.json');
     //data.Districts.forEach(el => {
     //    strapi.query('districts').create({
     //        district: el.district
     //    }).then(d => {
     //        let serviceAreas = data.Service_Area.filter(a => a.district === `${el.id}`)
     //        // console.log(serviceAreas)
     //        serviceAreas.forEach(sarea => {
     //            strapi.services.areas.create({
     //                area: sarea["Service area"],
     //                district: d._id
     //            })
     //        })
     //    })
     //})
};
