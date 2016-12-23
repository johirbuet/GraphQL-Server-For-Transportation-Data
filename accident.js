var express = require('express');
var graphqlHTTP = require('express-graphql');
var bodyParser = require('body-parser');
var util= require('./util.js')
var fs=require('fs');
var LineByLineReader = require('line-by-line');
var { buildSchema,GraphQLObjectType,GraphQLList,GraphQLSchema,GraphQLString,GraphQLInt,GraphQLFloat} = require('graphql');
var { apolloExpress, graphiqlExpress } = require('apollo-server');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var mongooseSchema=getMongooseSchemaFromProtoFile2('accident.proto')
mongoose.connect('mongodb://localhost/fars2015');
//var accident=new Schema(mongooseSchema);
var accident = new Schema(
  {
    STATE : { type : Number},
    ST_CASE : { type : Number},
    VE_TOTAL : { type : Number},
    VE_FORMS : { type : Number},
    PVH_INVL : { type : Number},
    PEDS : { type : Number},
    PERNOTMVIT : { type : Number},
    PERMVIT : { type : Number},
    PERSONS : { type : Number},
    COUNTY : { type : Number},
    CITY : { type : Number},
    DAY : { type : Number},
    MONTH : { type : Number},
    YEAR : { type : Number},
    DAY_WEEK : { type : Number},
    HOUR : { type : Number},
    MINUTE : { type : Number},
    NHS : { type : Number},
    RUR_URB : { type : Number},
    FUNC_SYS : { type : Number},
    RD_OWNER : { type : Number},
    ROUTE : { type : Number},
    TWAY_ID : { type : String},
    TWAY_ID2 : { type : String},
    MILEPT : { type : Number},
    LATITUDE : { type : Number},
    LONGITUD : { type : Number},
    SP_JUR : { type : Number},
    HARM_EV : { type : Number},
    MAN_COLL : { type : Number},
    RELJCT1 : { type : Number},
    RELJCT2 : { type : Number},
    TYP_INT : { type : Number},
    WRK_ZONE : { type : Number},
    REL_ROAD : { type : Number},
    LGT_COND : { type : Number},
    WEATHER1 : { type : Number},
    WEATHER2 : { type : Number},
    WEATHER : { type : Number},
    SCH_BUS : { type : Number},
    RAIL : { type : Number},
    NOT_HOUR : { type : Number},
    NOT_MIN : { type : Number},
    ARR_HOUR : { type : Number},
    ARR_MIN : { type : Number},
    HOSP_HR : { type : Number},
    HOSP_MN : { type : Number},
    CF1 : { type : Number},
    CF2 : { type : Number},
    CF3 : { type : Number},
    FATALS : { type : Number},
    DRUNK_DR : { type : Number}
    }

);


var myModel = mongoose.model('Accident',accident);
//console.log("Hello World");
function fetchAccidents(){
  myModel.find({},function(err,accidents){
    //console.log(accidents);
    return accidents;
  });
}
var AccidentType=new GraphQLObjectType({
  name:'AccidentType',
  description:'An Accident Record',
  fields:() =>({
    STATE:{
      type: GraphQLInt,
      resolve: accident=>accident.STATE
    },
    ST_CASE:{
      type: GraphQLInt,
      resolve: accident=>accident.ST_CASE
    },
    VE_TOTAL :{
      type: GraphQLInt,
      resolve:accident=>accident.VE_TOTAL
    },
    VE_FORMS :{
      type: GraphQLInt,
      resolve: accident=>accident.VE_FORMS
    },
    PVH_INVL :{
      type: GraphQLInt,
      resolve: accident=> accident.PVH_INVL
    },
    PEDS: {
      type: GraphQLInt,
      resolve: accident=> accident.PEDS
    },
    PERNOTMVIT :{
      type: GraphQLInt,
      resolve: accident=>accident.PERNOTMVIT
    },
    PERMVIT :{
      type: GraphQLInt,
      resolve: accident => accident.PERMVIT
    },
    PERSONS : {
      type: GraphQLInt,
      resolve: accident=> accident.PERSONS
    },
    COUNTY: {
      type: GraphQLInt,
      resolve: accident => accident.COUNTY
    },
    CITY:{
      type: GraphQLInt,
      resolve: accident=> accident.CITY
    },
    DAY: {
      type: GraphQLInt,
      resolve: accident=> accident.DAY
    },
    MONTH:{
      type: GraphQLInt,
      resolve: accident => accident.MONTH
    },
    YEAR:{
      type: GraphQLInt,
      resolve: accident => accident.YEAR
    },
    DAY_WEEK:{
      type: GraphQLInt,
      resolve: accident => accident.DAY_WEEK
    },
    HOUR:{
      type: GraphQLInt,
      resolve: accident => accident.HOUR
    },
    MINUTE:{
      type: GraphQLInt,
      resolve: accident=> accident.MINUTE
    },
    NHS:{
      type: GraphQLInt,
      resolve: accident => accident.NHS
    },
    RUR_URB:{
      type: GraphQLInt,
      resolve: accident=> accident.RUR_URB
    },
    FUNC_SYS : {
      type: GraphQLInt,
      resolve: accident=> accident.FUNC_SYS
    },
    RD_OWNER : {
      type: GraphQLInt,
      resolve: accident=> accident.FUNC_SYS
    },
    ROUTE:{
      type: GraphQLInt,
      resolve: accident=>accident.ROUTE
    },
    TWAY_ID:{
      type: GraphQLString,
      resolve: accident => accident.TWAY_ID
    },
    TWAY_ID2:{
      type: GraphQLString,
      resolve: accident=> accident.TWAY_ID2
    },
    MILEPT :{
      type: GraphQLInt,
      resolve: accident=> accident.MILEPT
    },
    LATITUDE:{
      type: GraphQLFloat,
      resolve: accident => accident.LATITUDE
    },
    LONGITUD:{
      type: GraphQLFloat,
      resolve: accident=> accident.LONGITUD
    },
    SP_JUR: {
      type: GraphQLInt,
      resolve: accident => accident.SP_JUR
    },
    HARM_EV:{
      type: GraphQLInt,
      resolve: accident=>accident.HARM_EV
    },
    MAN_COLL:{
      type: GraphQLInt,
      resolve: accident=> accident.MAN_COLL
    },
    RELJCT1:{
      type: GraphQLInt,
      resolve: accident=> accident.RELJCT1
    },
    RELJCT2:{
      type: GraphQLInt,
      resolve: accident=> accident.RELJCT2
    },
    TYP_INT:{
      type: GraphQLInt,
      resolve: accident=> accident.TYP_INT
    },
    WRK_ZONE:{
      type:GraphQLInt,
      resolve: accident=>accident.WRK_ZONE
    },
    REL_ROAD:{
      type: GraphQLInt,
      resolve: accident=>accident.REL_ROAD
    },
    LGT_COND:{
      type : GraphQLInt,
      resolve: accident=>accident.LGT_COND
    },
    WEATHER:{
      type: GraphQLInt,
      resolve: accident=>accident.WEATHER
    },
    WEATHER1:{
      type: GraphQLInt,
      resolve: accident=>accident.WEATHER1
    },
    WEATHER2:{
      type: GraphQLInt,
      resolve: accident=>accident.WEATHER2
    },
    SCH_BUS:{
      type: GraphQLInt,
      resolve: accident=> accident.SCH_BUS
    },
    RAIL:{
      type: GraphQLInt,
      resolve: accident => accident.RAIL
    },
    NOT_HOUR :{
      type: GraphQLInt,
      resolve: accident=>accident.NOT_HOUR
    },
    NOT_MIN:{
      type: GraphQLInt,
      resolve: accident=> accident.NOT_MIN
    },
    ARR_HOUR:{
      type: GraphQLInt,
      resolve: accident=>accident.ARR_HOUR
    },
    ARR_MIN:{
      type: GraphQLInt,
      resolve: accident=>accident.ARR_MIN
    },
    HOSP_HR:{
      type: GraphQLInt,
      resolve: accident=> accident.HOSP_HR
    },
    HOSP_MN:{
      type: GraphQLInt,
      resolve: accident=> accident.HOSP_MN
    },
    CF1:{
      type: GraphQLInt,
      resolve: accident=>accident.CF1
    },
    CF2:{
      type: GraphQLInt,
      resolve: accident=>accident.CF2
    },
    CF3:{
      type: GraphQLInt,
      resolve:  accident=>accident.CF3
    },
    FATALS:{
      type: GraphQLInt,
      resolve: accident=>accident.FATALS
    },
    DRUNK_DR : {
      type: GraphQLInt,
      resolve: accident=>accident.DRUNK_DR
    }
  }),
});

var QueryType = new GraphQLObjectType({
  name:'Query',
  fields:() =>({
    allAccidents: {
      type: new GraphQLList(AccidentType),
      resolve: () =>myModel.find({},function(err,accidents){return accidents;})
    },
    accidentsByState:{
      type: new GraphQLList(AccidentType),
      args:{
        STATEID: {type: GraphQLInt},
      },
      resolve: (root,args) => myModel.find({STATE : args.STATEID},function(err, accidents){ return accidents;})
    },
    accidentsByWeekday:{
      type: new GraphQLList(AccidentType),
      args:{
          WEEKDAY: {type: GraphQLInt},
        },
        resolve: (root,args) => myModel.find({DAY_WEEK : args.WEEKDAY},function(err, accidents){ return accidents;})
    },
    accidentByHours:
    {
      type: new GraphQLList(AccidentType),
      args:{
          HOUR_OF_DAY: {type: GraphQLInt}
        },
        resolve: (root,args) => myModel.find({HOUR : args.HOUR_OF_DAY},function(err, accidents){ return accidents;})

    },
    accidentByMonth:
    {
      type: new GraphQLList(AccidentType),
      args:{
          MONTH: {type: GraphQLInt}
        },
        resolve: (root,args) => myModel.find({MONTH : args.MONTH},function(err, accidents){ return accidents;})

    },
    accidentFatalitiesMoreThan:
    {
      type: new GraphQLList(AccidentType),
      args:{
          LOWER_LIMIT: {type: GraphQLInt}
        },
        resolve: (root,args) => myModel.find({FATALS : {$gte: args.LOWER_LIMIT}},function(err, accidents){ return accidents;})
    },
    accidentPedestriansMoreThan:
    {
      type: new GraphQLList(AccidentType),
      args:{
          LOWER_LIMIT: {type: GraphQLInt}
        },
        resolve: (root,args) => myModel.find({PEDS : {$gte: args.LOWER_LIMIT}},function(err, accidents){ return accidents;})
    },
    accidentHarmFulEventsMoreThan:
    {
      type: new GraphQLList(AccidentType),
      args:{
          LOWER_LIMIT: {type: GraphQLInt}
        },
        resolve: (root,args) => myModel.find({HARM_EV : {$gte: args.LOWER_LIMIT}},function(err, accidents){ return accidents;})
    },
    accidentDrunkDriversMoreThan:
    {
      type: new GraphQLList(AccidentType),
      args:{
          LOWER_LIMIT: {type: GraphQLInt}
        },
        resolve: (root,args) => myModel.find({DRUNK_DR : {$gte: args.LOWER_LIMIT}},function(err, accidents){ return accidents;})
    },
    accidentVehiclesMoreThan:
    {
      type: new GraphQLList(AccidentType),
      args:{
          LOWER_LIMIT: {type: GraphQLInt}
        },
        resolve: (root,args) => myModel.find({VE_TOTAL : {$gte: args.LOWER_LIMIT}},function(err, accidents){ return accidents;})
    },
    accidentBetweenHours:
    {
      type: new GraphQLList(AccidentType),
      args:{
          TO: {type: GraphQLInt},
          FROM: {type: GraphQLInt}
        },
        resolve: (root,args) => myModel.find({HOUR : {$gte: args.FROM,$lte: args.TO}},function(err, accidents){ return accidents;})
    },

    /*,
    accidentInState:{
      type:
    }*/
  }),
});


var schema=new GraphQLSchema({
  query: QueryType,
});

var app = express();
app.use('/fars', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/fars');
/*var app = express();
app.use('/fars', bodyParser.json(), apolloExpress({schema}));
app.use('/FARSquery', graphiqlExpress({endpointURL: '/fars'}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphiql'));
*/

function getMongooseSchemaFromProtoFile(filename)
{
  let fields=[];
  var schema={};
  lr = new LineByLineReader(filename);
  var i=0;
  lr.on('line',function(line){
  //  console.log(line);
    var strs=line.split(" ");
  //  console.log(strs.length);
    if(strs.length >4)
    {
      var type=strs[1];
      var field=strs[2];
      var obj={'type':type,'field':field};
      console.log(obj);
      fields.push(obj);
    }

  });
  console.log(fields);
  fields.forEach(function(d){
    var t = d.type=='float' || d.type == 'int32'? 'Number':'String';
    console.log(t);
    var f=d.field;
    var obj={f : { type : t}};
    schema.push(obj);
  });

   console.log(schema);
  return schema;
}
