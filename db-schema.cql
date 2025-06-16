CREATE KEYSPACE IF NOT EXISTS customer-review
WITH replication = {'class': 'NetworkTopologyStrategy', 'datacenter1': 1};

USE customer-review;

CREATE TABLE IF NOT EXISTS videos (
    video_id UUID PRIMARY KEY,
    title TEXT,
    description TEXT
);

CREATE TABLE IF NOT EXISTS comments (
    video_id UUID,
    comment_id UUID,
    user_id UUID,
    content TEXT,
    timestamp TIMESTAMP,
    like_count INT,
    dislike_count INT,
    parent_comment_id UUID,
    PRIMARY KEY ((video_id), comment_id)
) WITH CLUSTERING ORDER BY (comment_id DESC);

CREATE INDEX IF NOT EXISTS ON comments (parent_comment_id);
