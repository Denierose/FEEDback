const Review = require('../models/ReviewModel.js');
const Comment = require('../models/CommentModel.js');
const Rate = require('../models/RateModel.js');

exports.getAllReview = async (req, res) => {
  try {
    const reviews = await Review.find().populate('comments').populate('rating');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};  

exports.getOneReview = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findById(id).populate('comments').populate('rating'); 
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createReview = async (req, res) => {
  const { imgUrl, title, location, status, type } = req.body;
  const newReview = new Review({ imgUrl, title, location, status, type });
  try {
    const savedReview = await newReview.save();
    res.json(savedReview);
  } catch (err) {
    res.status(400).json({ error: 'Bad Request' });
  }
};

exports.createComment = async (req, res) => {
  const { id } = req.params;
  const { user, content } = req.body;

  try {
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    const existingComment = await Comment.findOne({ user: user, review: id });
    if (existingComment) {
      return res.status(400).json({ error: 'You have already commented on this review!' });
    } else {
      const newComment = new Comment({ user, review: id, content });

      await newComment.save();
      review.comments.push(newComment._id);
      await review.save();

      res.json(newComment);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateComment = async (req, res) => {
  const { id } = req.params;
  const { user, content } = req.body;
  
  try {
    const review = await Review.findById(id);
      
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    const existingComment = await Comment.findOneAndUpdate({ user: user, review: id }, { content: content }, { new: true });

    if (existingComment) {
      res.json(existingComment);
    } else {
      return res.status(404).json({ error: 'Comment not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
  exports.createRate = async (req, res) => {
    const { id } = req.params;
    const { user, rating } = req.body;
  
    try {
      const review = await Review.findById(id);
  
      if (!review) {
        return res.status(404).json({ error: 'Review not found' });
      }
  
      const existingRating = await Rate.findOne({ user: user, review: id });
  
      if (existingRating) {
        return res.status(400).json({ error: 'You have already rated this place!' });
      } else {
        const newRate = new Rate({ user, rating });
        newRate.review = review;
        await newRate.save();
        review.rating.push(newRate._id);
        await review.save();
        res.json(newRate);
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  
exports.updateReview = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedReview = await Review.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedReview) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(updatedReview);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndRemove(req.params.id);
    if (!deletedReview) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(deletedReview);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

