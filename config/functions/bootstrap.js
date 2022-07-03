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
    // exportOrders()
};

function exportOrders() {
    const data = require('../../orders-1656718973486.json');

    data.forEach(order => {
        strapi.query('orders').create({
            "status": order.status,
            "name": order.name,
            "mobile_number": order.mobile_number,
            "district": order.district,
            "area": order.area,
            "address": order.address,
            "requested_date": order.requested_date,
            "published_at": order.published_at,
            "createdAt": order.createdAt,
            "updatedAt": order.updatedAt,
        })
    })
}


function exportDistrictAreas() {
    const data = require('../../data.json');

    data.Districts.forEach(el => {
        strapi.query('districts').create({
            district: el.district
        }).then(d => {
            let serviceAreas = data.Service_Area.filter(a => a.district === `${el.id}`)
            // console.log(serviceAreas)
            serviceAreas.forEach(sarea => {
                strapi.services.areas.create({
                    area: sarea["Service area"],
                    district: d._id
                })
            })
        })
    })
}
