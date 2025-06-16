/*
 * Author: Akshaya Bhandare
 * Page: Router to connect to controller
 * Created At: 14-Jun-2025 
*/
import { Router } from 'express';
import { postComment, getComments, replyToComment, likeComment, dislikeComment, getTopComments, getReplies } from '../controllers/comments';

const router = Router();

router.post('/videos/:videoId/comments', postComment);
router.get('/videos/:videoId/comments', getComments);
router.post('/comments/:commentId/reply', replyToComment);
router.post('/comments/:commentId/like', likeComment);
router.post('/comments/:commentId/dislike', dislikeComment);
router.get('/videos/:videoId/top-comments', getTopComments);
router.get('/comments/:commentId/replies', getReplies);

export default router;
