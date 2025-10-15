'use client'

import { useState, useEffect } from 'react'
import { MessageSquare, X, Send, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface Comment {
  id: string
  x: number
  y: number
  author: string
  text: string
  timestamp: number
  page: string
}

export function CommentSystem() {
  const [isCommentMode, setIsCommentMode] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [activeComment, setActiveComment] = useState<string | null>(null)
  const [newCommentPosition, setNewCommentPosition] = useState<{ x: number; y: number } | null>(null)
  const [author, setAuthor] = useState('')
  const [commentText, setCommentText] = useState('')

  // Get current page URL for filtering comments
  const currentPage = typeof window !== 'undefined' ? window.location.pathname : ''

  // Load comments from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('design-comments')
    if (stored) {
      setComments(JSON.parse(stored))
    }
    const storedAuthor = localStorage.getItem('comment-author')
    if (storedAuthor) {
      setAuthor(storedAuthor)
    }
  }, [])

  // Save comments to localStorage
  useEffect(() => {
    localStorage.setItem('design-comments', JSON.stringify(comments))
  }, [comments])

  // Save author to localStorage
  useEffect(() => {
    if (author) {
      localStorage.setItem('comment-author', author)
    }
  }, [author])

  // Handle click to add comment
  const handleClick = (e: React.MouseEvent) => {
    if (!isCommentMode) return
    
    const rect = document.body.getBoundingClientRect()
    const x = e.clientX - rect.left + window.scrollX
    const y = e.clientY - rect.top + window.scrollY
    
    setNewCommentPosition({ x, y })
  }

  const addComment = () => {
    if (!newCommentPosition || !author.trim() || !commentText.trim()) return

    const newComment: Comment = {
      id: Date.now().toString(),
      x: newCommentPosition.x,
      y: newCommentPosition.y,
      author: author.trim(),
      text: commentText.trim(),
      timestamp: Date.now(),
      page: currentPage,
    }

    setComments([...comments, newComment])
    setNewCommentPosition(null)
    setCommentText('')
  }

  const deleteComment = (id: string) => {
    setComments(comments.filter(c => c.id !== id))
    setActiveComment(null)
  }

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: '2-digit' 
    })
  }

  // Filter comments for current page
  const pageComments = comments.filter(c => c.page === currentPage)

  return (
    <>
      {/* Toggle Button */}
      <div className="fixed bottom-6 right-6 z-[9999]">
        <Button
          onClick={() => {
            setIsCommentMode(!isCommentMode)
            setNewCommentPosition(null)
            setActiveComment(null)
          }}
          className={`h-14 w-14 rounded-full shadow-lg transition-all ${
            isCommentMode 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-neutral-900 hover:bg-neutral-800'
          }`}
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </div>

      {/* Comment Mode Indicator */}
      {isCommentMode && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none">
          <div className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg text-sm font-medium">
            💬 Comment Mode Active - Click anywhere to add a comment
          </div>
        </div>
      )}

      {/* Click overlay for comment mode */}
      {isCommentMode && (
        <div
          className="fixed inset-0 z-[9998] cursor-crosshair"
          onClick={handleClick}
          style={{ background: 'rgba(59, 130, 246, 0.1)' }}
        />
      )}

      {/* Comment Markers */}
      {pageComments.map((comment) => (
        <div
          key={comment.id}
          className="fixed z-[9997] cursor-pointer"
          style={{ left: comment.x, top: comment.y }}
          onClick={(e) => {
            e.stopPropagation()
            setActiveComment(activeComment === comment.id ? null : comment.id)
          }}
        >
          <div className={`h-8 w-8 rounded-full flex items-center justify-center transition-all ${
            activeComment === comment.id
              ? 'bg-blue-600 ring-4 ring-blue-200'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}>
            <MessageSquare className="h-4 w-4 text-white" />
          </div>

          {/* Comment Popup */}
          {activeComment === comment.id && (
            <Card className="absolute left-10 top-0 w-80 shadow-2xl z-[10000]">
              <CardHeader className="p-4 pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="text-sm font-semibold text-neutral-900">
                      {comment.author}
                    </CardTitle>
                    <p className="text-xs text-neutral-500 mt-1">
                      {formatTime(comment.timestamp)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteComment(comment.id)
                    }}
                    className="h-7 w-7 p-0 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-neutral-700 whitespace-pre-wrap">
                  {comment.text}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      ))}

      {/* New Comment Form */}
      {newCommentPosition && (
        <div
          className="fixed z-[10000]"
          style={{ left: newCommentPosition.x + 40, top: newCommentPosition.y }}
        >
          <Card className="w-96 shadow-2xl border-blue-200">
            <CardHeader className="p-4 pb-3 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">Add Comment</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setNewCommentPosition(null)}
                  className="h-7 w-7 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div>
                <label className="text-xs font-medium text-neutral-700 mb-1.5 block">
                  Your Name
                </label>
                <Input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g., Sarah (Design Manager)"
                  className="text-sm"
                  autoFocus={!author}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-neutral-700 mb-1.5 block">
                  Comment
                </label>
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add your feedback here..."
                  className="w-full min-h-24 px-3 py-2 text-sm rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  autoFocus={!!author}
                />
              </div>
              <Button
                onClick={addComment}
                disabled={!author.trim() || !commentText.trim()}
                className="w-full"
              >
                <Send className="h-4 w-4 mr-2" />
                Add Comment
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Comment Count Badge */}
      {pageComments.length > 0 && !isCommentMode && (
        <div className="fixed bottom-24 right-6 z-[9998]">
          <div className="bg-neutral-900 text-white px-3 py-1 rounded-full text-xs font-medium">
            {pageComments.length} {pageComments.length === 1 ? 'comment' : 'comments'}
          </div>
        </div>
      )}
    </>
  )
}

