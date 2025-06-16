/*
 * Author: Akshaya Bhandare
 * Page: User can add new comment and update existing
 * Created At: 14-Jun-2025 
*/
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { client } from '../db/client';

// Utilities
const now = () => new Date();

// Add Comments
export async function postComment(req: Request, res: Response) {
  const { videoId } = req.params;
  const { user_id, content } = req.body;
  const id = uuidv4();
  try {
    await client.execute(
      'INSERT INTO comments (video_id, comment_id, user_id, content, timestamp, like_count, dislike_count, parent_comment_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [videoId, id, user_id, content, now(), 0, 0, null],
      { prepare: true }
    );
    res.status(201).json({ message: 'Comment posted', comment_id: id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get all the comments based on video ID
export async function getComments(req: Request, res: Response) {
  const { videoId } = req.params;
  try {
    const result = await client.execute('SELECT * FROM comments WHERE video_id = ?', [videoId], { prepare: true });
    const topLevel = result.rows.filter(c => !c.parent_comment_id);
    res.json(topLevel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Add replied to the comments using comment and video ID
export async function replyToComment(req: Request, res: Response) {
  const { commentId } = req.params;
  const { video_id, user_id, content } = req.body;
  const replyId = uuidv4();
  try {
    await client.execute(
      'INSERT INTO comments (video_id, comment_id, user_id, content, timestamp, like_count, dislike_count, parent_comment_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [video_id, replyId, user_id, content, now(), 0, 0, commentId],
      { prepare: true }
    );
    res.status(201).json({ message: 'Reply added', reply_id: replyId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Like comments using comment ID
export async function likeComment(req: Request, res: Response) {
  const { commentId } = req.params;
  try {
    await client.execute('UPDATE comments SET like_count = like_count + 1 WHERE comment_id = ?', [commentId], { prepare: true });
    res.json({ message: 'Comment liked' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Toggle LIKE 
export async function dislikeComment(req: Request, res: Response) {
  const { commentId } = req.params;
  try {
    await client.execute('UPDATE comments SET dislike_count = dislike_count + 1 WHERE comment_id = ?', [commentId], { prepare: true });
    res.json({ message: 'Comment disliked' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get latest comments
export async function getTopComments(req: Request, res: Response) {
  const { videoId } = req.params;
  try {
    const result = await client.execute('SELECT * FROM comments WHERE video_id = ?', [videoId], { prepare: true });
    const topLevel = result.rows.filter(c => !c.parent_comment_id);
    topLevel.sort((a, b) => {
      const scoreA = a.like_count - a.dislike_count - (Date.now() - a.timestamp.getTime()) / 1_000_000;
      const scoreB = b.like_count - b.dislike_count - (Date.now() - b.timestamp.getTime()) / 1_000_000;
      return scoreB - scoreA;
    });
    res.json(topLevel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get all replied for the comment
export async function getReplies(req: Request, res: Response) {
  const { commentId } = req.params;
  try {
    const result = await client.execute('SELECT * FROM comments WHERE parent_comment_id = ?', [commentId], { prepare: true });
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
