const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Book title is required'],
        trim: true,
        maxLength: [200, 'Title cannot exceed 200 characters']
    },
    author: {
        type: String,
        required: [true, 'Author name is required'],
        trim: true
    },
    genre: {
        type: String,
        required: [true, 'Genre is required'],
        enum: {
            values: [
                'Fiction',
                'Non-Fiction',
                'Science',
                'Technology',
                'History',
                'Biography',
                'Mystery',
                'Romance',
                'Fantasy',
                'Other'
            ],
            message: '{VALUE} is not a supported genre'
        }
    },
    publication_date: {
        type: Date,
        required: [true, 'Publication date is required']
    },
    availability: {
        type: Boolean,
        default: true
    },
    edition: {
        type: String,
        trim: true
    },
    summary: {
        type: String,
        trim: true,
        maxLength: [1000, 'Summary cannot exceed 1000 characters']
    },
    isbn: {
        type: String,
        required: [true, 'ISBN is required'],
        unique: true,
        trim: true
    },
    copies: {
        total: {
            type: Number,
            required: [true, 'Total number of copies is required'],
            min: [0, 'Total copies cannot be negative'],
            default: 1
        },
        available: {
            type: Number,
            min: [0, 'Available copies cannot be negative'],
            default: function() {
                return this.copies.total;
            }
        }
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes for better query performance
bookSchema.index({ title: 1 });
bookSchema.index({ author: 1 });
bookSchema.index({ isbn: 1 }, { unique: true });

// Virtual for book status
bookSchema.virtual('status').get(function() {
    if (this.copies.available === 0) {
        return 'Not Available';
    }
    return 'Available';
});

// Pre-save middleware to validate copies
bookSchema.pre('save', function(next) {
    if (this.copies.available > this.copies.total) {
        next(new Error('Available copies cannot exceed total copies'));
    }
    if (this.copies.available === 0) {
        this.availability = false;
    } else {
        this.availability = true;
    }
    next();
});

// Method to check if book can be borrowed
bookSchema.methods.canBeBorrowed = function() {
    return this.copies.available > 0;
};

// Static method to find all available books
bookSchema.statics.findAvailable = function() {
    return this.find({ 'copies.available': { $gt: 0 } });
};

const bookModel = mongoose.model('Book', bookSchema);

module.exports = bookModel;