const { gql } = require('apollo-server-koa');

const User = require('../models/user-model')
const Doctor = require('../models/doctor-model')
const Mail = require('../models/mail-model')
const Appointment = require('../models/appointment-model')
const Bed = require('../models/bed-model')
const MedicalCase = require('../models/medicalcase-model')
const DeptDuty = require('../models/deptduty-model')
const DoctorAssessment = require('../models/docass-model')


// Construct a schema, using GraphQL schema language

s = `

`

exports.typeDefs = gql`

  type User {
    userId: Int,
    username: String,
    age: Int,
    gender: String
  }

  type Doctor {
    doctorId: Int,
    doctorname: String,
    age: Int,
    department: String,
    years: Int
  }

  type DoctorAssessment{
    doctor:Doctor,
    score: Int,
    assessment: String,
  }

  type Bed {
    user: User,
    bedId: Int ,
    roomId: Int
  }

  type MedicalCase {
    user: User,
    doctor: Doctor,
    bed:Bed,
    date: String,
    history: String,
    symptom: String,
    diagnosis: String,
    drug: String,
    note: String,
  }

  type Mail {
    email: String,
    username: String,
    claim: String
  }

  type Appointment {
    user: User,
    date: String,
    timeSlot: Int,
    department: String,
    note: String,
  }

  type Query {
    hello: String,
    user(userId:Int, username:String): [User],
    doctor(doctorId:Int, doctorname:String): [Doctor],
    mail: [Mail],
    appointment: [Appointment],
    bed(bedId: Int, roomId: Int): Bed,
    medicalCase(userId:Int):MedicalCase,
    doctorAssessment(doctorId:Int):[DoctorAssessment],
  }

  type Mutation {
    updateUser(userId:Int, username:String, age:Int, gender:Boolean): User,
    updateDoctor(doctorId:Int, doctorname:String, department:String, age:Int, years:Int):Doctor,
    addMail(email:String, username:String, claim:String): Mail,
    addAppointment(userId:Int, date:String, timeSlot:Int, department:String, note:String):Appointment,
    addBed(bedId:Int, roomId: Int, userId:Int):Bed,
    addMedicalCase(userId:Int, doctorId: Int, bedId:Int, roomId: Int, date:String, 
      history:String, symptom: String, diagnosis:String, 
      drug:String, note:String):MedicalCase,
    updateMedicalCase(userId:Int, doctorId: Int, bedId:Int, roomId:Int, date:String, 
      history:String, symptom: String, diagnosis:String, 
      drug:String, note:String):MedicalCase,
    addDoctorAssessment(doctorId:Int, score:Int, assessment:String):DoctorAssessment,
  }
`;

// Provide resolver functions for your schema fields
exports.resolvers = {
  User: {
    userId: (user)  => user.userId,
    username: (user)=> user.username,
    age: (user)=> user.age,
    gender: (user)=> {
      if(user.gender)
        return "男"
      else
        return "女"
    },
  },

  Doctor: {
    doctorId: doctor => doctor.doctorId,
    doctorname: doctor => doctor.doctorname,
    age: doctor => doctor.age,
    department: doctor => doctor.department,
    years: doctor => doctor.years,
  },

  DoctorAssessment: {
    async doctor(docass){
      const doctor = await Doctor.findOne({doctorId:docass.doctorId})
      return doctor 
    },
    score: (docass) => docass.score,
    assessment: (docass) => docass.assessment,
  },

  Mail: {
    email: (mail) => mail.email,
    username: (mail) => mail.username,
    claim: (mail) =>mail.claim,
  },

  Bed: {
    bedId: (bed) => bed.bedId,
    roomId: (bed) => bed.roomId,
    user: (bed) => {
      const user = User.findOne({userId:bed.userId})
      return user
    },
  },

  Appointment: {
    user: (appoint) => {
      const user = User.findOne({userId:appoint.userId})
      return user
    },
    date: (appoint) => (new Date(appoint.date)).toLocaleDateString(),
    timeSlot: (appoint) => appoint.timeSlot,
    department: (appoint) => appoint.department,
    note: (appoint) => appoint.note,
  },

  MedicalCase: {
    async user (mcase)  {
      const user = await User.findOne({userId:mcase.userId})
      return user
    },
    async doctor(mcase) {
      const doctor = Doctor.findOne({doctorId:mcase.doctorId})
      return doctor
    },
    async bed (mcase) {
      const bed = Bed.findOne({bedId:mcase.bedId, roomId:mcase.roomId})
      return bed 
    },
    date: (mcase) => (new Date(mcase.date)).toLocaleDateString(),
    history: (mcase) => mcase.history,
    symptom: (mcase) => mcase.symptom,
    diagnosis: (mcase) => mcase.diagnosis,
    drug: (mcase) => mcase.drug,
    note: (mcase) => mcase.note,
  },

  Mutation: {
    async updateUser(parent, args){
      await User.updateOne({userId:args.userId}, args)
      const user = await User.findOne({userId: args.userId})
      // console.log(user)
      return user
    },
    async updateDoctor(parent, args){
      await Doctor.updateOne({userId:args.doctorId}, args)
      const doctor = await Doctor.findOne({doctorId: args.doctorId})
      return doctor
    },
    async addMail(parent, args){
      const mail = await Mail.create(args)
      return mail
    },

    async addAppointment(parent, args){
      const appoint = await Appointment.create(args)
      return appoint
    },

    async addBed(parent, args){
      const bed = await Bed.create(args)
      return bed
    },

    async addMedicalCase(parent, args){
      const mcase = await MedicalCase.create(args)
      return mcase
    },

    async updateMedicalCase(parent, args){
      await MedicalCase.updateOne({userId:args.userId}, args)
      const mcase = await MedicalCase.findOne(args)
      return mcase
    },

    async addDoctorAssessment(parent, args){
      const assessment = await DoctorAssessment.create(args)
      return assessment
    }

  },

  Query: {
    async hello () {return 'Hello world!'},

    async user (parent, args) {
      let users;
      if(args.userId)
        users = await User.find({userId:args.userId});
      else if(args.username)
        users = await User.find({username:args.username})
      else
        users = await User.find()
      return users
    },

    async doctor(parent, args){
      let doctor;
      if (args.doctorId)
        doctors = await Doctor.find({doctorId: args.doctorId})
      else if(args.doctorname)
        doctors = await Doctor.find({doctorname: args.doctorname})
      else
        doctors = await Doctor.find()
      return doctors
    },

    async doctorAssessment(parent, args){
      const assessments = DoctorAssessment.find(args)
      return assessments
    },

    async mail(parent, args) {
      const mails = await Mail.find()
      return mails
    },

    async appointment(parent, args){
      const appoints = await Appointment.find()
      return appoints
    },

    async bed(parent, args){
      const bed = await Bed.findOne(args)
      return bed
    },

    async medicalCase(parent, args){
      const mcase = await MedicalCase.findOne(args)
      return mcase
    }


  },

};
