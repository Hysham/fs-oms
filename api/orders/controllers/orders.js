'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
var admin = require('firebase-admin');

var serviceAccount = require("../../../fs-oms-firebase-adminsdk-kjkia-79a3b6a9d9.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


var admin = require('firebase-admin');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
module.exports = {
    /**
     * Create a record.
     *
     * @return {Object}
     */

    async create(ctx) {
        let entity;
        if (ctx.is('multipart')) {
            const { data, files } = parseMultipartData(ctx);
            entity = await strapi.services.orders.create(data, { files });
        } else {
            const isExist = await strapi.services.orders.findOne({ mobile_number: ctx.request.body.mobile_number });
            if (!isExist) {
                entity = await strapi.services.orders.create(ctx.request.body);
                this.sendPush(entity)
            } else {
                return {
                    "error": "Mobile number already exist"
                }
            }
        }
        return sanitizeEntity(entity, { model: strapi.models.orders });
    },
    async sendPush(ordr) {
        try {
            const order = sanitizeEntity(ordr, { model: strapi.models.orders })
            const users = await strapi.query('user', 'users-permissions').find({ 'district.district': order.district })
            const userTokens = users.map(e => e.notificationToken)
            console.log(userTokens)
            if (userTokens.length) {
                await admin.messaging().sendToDevice(
                    userTokens, // ['token_1', 'token_2', ...]
                    {
                        notification: {
                            title: `${order.name} - ${order.mobile_number}`,
                            body: `At ${order.area}`
                        }
                    },
                    {
                    },
                );
            }

        } catch (err) {
            console.log(err)
        }
    }
};