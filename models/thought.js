const {Schema,model}=require ("mongoose")
const dateFormat=require ("../utils/date-format")
const reactionSchema=require ("./reaction")

const thoughtSchema=new Schema(
    {
        thoughtText:{
            type:String,
            required:true,
            minlength:1,
            maxlength:280,
        },
        username:{
            type:String,
            required:true,
        },
        createdAt:{
            type:Date,
            default:Date.now,
            get:timeStamp=>dateFormat(timeStamp),
        },
        reactions:[reactionSchema]
        
    },
    {
        toJSON:{
            virtuals:true,
            getters:true,
        },
        id:false,
    }
);

thoughtSchema.virtual("reactionCount").get(function(){
    return this.reactions.length
});

const Thought=model("Thought",thoughtSchema)

module.export=Thought