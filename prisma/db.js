"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extension_1 = require("@prisma/client/extension");
const prisma = global.prisma || new extension_1.PrismaClient();
exports.default = prisma;
