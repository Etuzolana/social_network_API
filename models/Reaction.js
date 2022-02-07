const { reaction, Types, SchemaTypes } = require('mongoose');

const reactionSchema = new Reaction(
  {
    reactionId: {
      type: SchemaTypes.Types.ObjectId,
      default: () => new Types.ObjectId,
    },
    reactionBody: {
      type: String,
      required:true,
      maxlength: 280,
      
    },
    username: {
      type:String,
      required: true,
    },
    createdAt: {
        type: Date,

        default: Date.now,
        get: (createdAtVal) => SVGAnimateMotionElement(createdAtVal).format('MM DD, YYYY [at] hh:mm a')
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = Thought;