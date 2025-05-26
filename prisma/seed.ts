import { PrismaClient, UserRole } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();
async function AddProduct() {
  const products = [
    {
      name: "Дотоод сүлжээнд",
      productDescription: {
        items: [
          "Үйлчлүүлэгчийн бүртгэл",
          "Цаг захиалга",
          "Үзлэг, эмчилгээний тэмдэглэл",
          "Автомат мессеж явуулах тохиргоо",
          "Рентген аппаратанд холбогдох",
          "Статистик мэдээлэл",
          "Кассын мэдээлэл",
          "Эргэн сануулах үйлчилгээ",
          "Эмийн жор гаргах",
          "Үйлчлүүлэгчийг ухаалгаар менеж хийх",
          "НӨАТ-н баримт хэвлэх",
          "Лаборатори захиалгын мэдээлэл",
        ],
      },
      productVariant: [
        {
          name: "Дотоод сүлжээнд, 1 сар, 1-3 кресл",
          price: 190000,
          discount: 0,
          duration: 1,
          unit: "month",
          sits: 3,
        },
        {
          name: "Дотоод сүлжээнд, 1 сар, 4-5 кресл",
          price: 240000,
          discount: 0,
          duration: 1,
          unit: "month",
          sits: 5,
        },
        {
          name: "Дотоод сүлжээнд, 1 сар, 6-10 кресл",
          price: 290000,
          discount: 0,
          duration: 1,
          unit: "month",
          sits: 10,
        },
        {
          name: "Дотоод сүлжээнд, 6 сар, 1-3 кресл",
          price: 1026000,
          discount: 114000,
          duration: 6,
          unit: "month",
          sits: 3,
        },
        {
          name: "Дотоод сүлжээнд, 6 сар, 4-5 кресл",
          price: 1296000,
          discount: 144000,
          duration: 6,
          unit: "month",
          sits: 5,
        },
        {
          name: "Дотоод сүлжээнд, 6 сар, 6-10 кресл",
          price: 1566000,
          discount: 174000,
          duration: 6,
          unit: "month",
          sits: 10,
        },
      ],
    },
    {
      name: "Интернэт сүлжээнд",
      productDescription: {
        items: [
          "Үйлчлүүлэгчийн бүртгэл",
          "Цаг захиалга",
          "Үзлэг, эмчилгээний тэмдэглэл",
          "Автомат мессеж явуулах тохиргоо",
          "Рентген аппаратанд холбогдох",
          "Статистик мэдээлэл",
          "Кассын мэдээлэл",
          "Эргэн сануулах үйлчилгээ",
          "Эмийн жор гаргах",
          "Үйлчлүүлэгчийг ухаалгаар менеж хийх",
          "НӨАТ-н баримт хэвлэх",
          "Лаборатори захиалгын мэдээлэл",
          "Өдөр болгоны өөрчлөлтийг хадгалах",
          "Олон салбар дундаа мэдээлэл солилцох",
          "Эмч цаг захиалгыг хүссэн газраасаа харах",
          "Таблет дээр үйлчлүүлэгчээс гарын үсэг авах",
        ],
      },
      productVariant: [
        {
          name: "Интернэт Орчинд, 1 сар, 1-3 кресл",
          price: 190000,
          discount: 0,
          duration: 1,
          unit: "month",
          sits: 3,
        },
        {
          name: "Интернэт Орчинд, 1 сар, 4-5 кресл",
          price: 390000,
          discount: 0,
          duration: 1,
          unit: "month",
          sits: 5,
        },
        {
          name: "Интернэт Орчинд, 1 сар, 6-10 кресл",
          price: 490000,
          discount: 0,
          duration: 1,
          unit: "month",
          sits: 10,
        },
        {
          name: "Интернэт Орчинд, 6 сар, 1-3 кресл",
          price: 1566000,
          discount: 174000,
          duration: 6,
          unit: "month",
          sits: 3,
        },
        {
          name: "Интернэт Орчинд, 6 сар, 4-5 кресл",
          price: 2106000,
          discount: 234000,
          duration: 6,
          unit: "month",
          sits: 5,
        },
        {
          name: "Интернэт Орчинд, 6 сар, 6-10 кресл",
          price: 2646000,
          discount: 294000,
          duration: 6,
          unit: "month",
          sits: 10,
        },
      ],
    },
    {
      name: "Өдөр болгоны дата Cloud-руу хадгалах",
      productDescription: {
        items: ["Өдөр болгоны дата Cloud-руу хадгалах"],
      },
      productVariant: [
        {
          name: "Өдөр болгоны дата Cloud-руу хадгалах, 1 сар",
          price: 20000,
          discount: 0,
          duration: 1,
          unit: "month",
          sits: 3,
        },
      ],
    },
  ];
  for (const product of products) {
    var newProduct = await prisma.product.create({
      data: {
        name: product.name,
        productDescription: product.productDescription,
      },
    });
    for (const variant of product.productVariant) {
      await prisma.productVariant.create({
        data: {
          ...variant,
          productId: newProduct.id,
        },
      });
    }
  }
}
async function addMachine() {
  const hospitalId = "cm4y81jyk0001bo7pryd67txj";

  const machines = [
    {
      machineName: "Computer 1",
      machineUniqueId: "00:1A:2B:3C:4D:5E",
      machineIps: ["192.168.1.100"],
      os: { name: "Windows 10", version: "10.0.19044" },
      ipAddress: "192.168.1.100",
      hospitalId
    },
    {
      machineName: "Computer 2",
      machineUniqueId: "00:1A:2B:3C:4D:5F",
      machineIps: ["192.168.1.101"],
      os: { name: "Windows 11", version: "11.0.22000" },
      ipAddress: "192.168.1.101",
      hospitalId
    },
    {
      machineName: "Computer 3",
      machineUniqueId: "00:1A:2B:3C:4D:60",
      machineIps: ["192.168.1.102"],
      os: { name: "Windows 10", version: "10.0.19044" },
      ipAddress: "192.168.1.102",
      hospitalId
    },
    {
      machineName: "Computer 4",
      machineUniqueId: "00:1A:2B:3C:4D:61",
      machineIps: ["192.168.1.103"],
      os: { name: "Windows 10", version: "10.0.19044" },
      ipAddress: "192.168.1.103",
      hospitalId
    },
    {
      machineName: "Computer 5",
      machineUniqueId: "00:1A:2B:3C:4D:62",
      machineIps: ["192.168.1.104"],
      os: { name: "Windows 11", version: "11.0.22000" },
      ipAddress: "192.168.1.104",
      hospitalId
    },
    {
      machineName: "Computer 6",
      machineUniqueId: "00:1A:2B:3C:4D:63",
      machineIps: ["192.168.1.105"],
      os: { name: "Windows 10", version: "10.0.19044" },
      ipAddress: "192.168.1.105",
      hospitalId
    },
    {
      machineName: "Computer 7",
      machineUniqueId: "00:1A:2B:3C:4D:64",
      machineIps: ["192.168.1.106"],
      os: { name: "Windows 10", version: "10.0.19044" },
      ipAddress: "192.168.1.106",
      hospitalId
    },
    {
      machineName: "Computer 8",
      machineUniqueId: "00:1A:2B:3C:4D:65",
      machineIps: ["192.168.1.107"],
      os: { name: "Windows 11", version: "11.0.22000" },
      ipAddress: "192.168.1.107",
      hospitalId
    },
    {
      machineName: "Computer 9",
      machineUniqueId: "00:1A:2B:3C:4D:66",
      machineIps: ["192.168.1.108"],
      os: { name: "Windows 10", version: "10.0.19044" },
      ipAddress: "192.168.1.108",
      hospitalId
    },
    {
      machineName: "Computer 10",
      machineUniqueId: "00:1A:2B:3C:4D:67",
      machineIps: ["192.168.1.109"],
      os: { name: "Windows 10", version: "10.0.19044" },
      ipAddress: "192.168.1.109",
      hospitalId
    }
  ];

  for (const machine of machines) {
    await prisma.machine.create({
      data: machine
    });
  }
}

//add products in database
addMachine()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("prisma seed finished");
    await prisma.$disconnect();
  });
async function addUsers() {
  const users = [
    {
      email: "head@edental.mn",
      phoneNumber: "80454011",
      password: "Pass1234!",
      role: UserRole.ADMIN,
      hospital: {
        name: "edental",
        phoneNumber: "99993333",
        subDomain: "eedental",
      },
    },
    {
      email: "marka@edental.mn",
      phoneNumber: "88109008",
      password: "Pass1234!",
      role: UserRole.ADMIN,
    },
  ];
  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        email: user.email,
        passwordDigest: await bcrypt.hash(user.password, 10),
        role: user.role,
        phoneNumber: user.phoneNumber,
        ...(user.hospital && {
          hospital: {
            connectOrCreate: {
              where: { subDomain: user.hospital.subDomain },
              create: {
                name: user.hospital.name,
                phoneNumber: user.hospital.phoneNumber,
              },
            },
          },
        }),
      },
    });
  }
}

// async function addHospitals() {
//   const hospitals = [
//     {
//       name: "edental",
//       phoneNumber: "99993333",
//     },
//   ];
//   for (const hospital of hospitals) {
//     await prisma.hospital.create({
//       data: {
//         name: hospital.name,
//         phoneNumber: hospital.phoneNumber,
//       },
//     });
//   }
// }
// addHospitals()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     console.log("prisma seed finished");
//     await prisma.$disconnect();
//   });
