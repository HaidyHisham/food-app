import React from 'react'

export default function Filters({ 
  onSearchChange, 
  onTagChange, 
  onCategoryChange, 
  tags = [], 
  categories = [] 
}) {
  return (
    <div className="px-4">
      <div className="row g-3 my-3">
        <div className="col-12 col-md-6 col-lg-8">
        <div className="input-group bg-white border rounded-3 shadow-sm px-3">
          <span className="input-group-text bg-transparent border-0 pe-0">
            <i className="fa-solid fa-magnifying-glass text-muted"></i>
          </span>
          <input
            type="text"
            className="form-control border-0 shadow-none py-2"
            placeholder="Search here ..."
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      {onTagChange && (
        <div className="col-6 col-md-3 col-lg-2">
          <select 
            className="form-select border-0 shadow-sm rounded-3 py-2 text-muted"
            onChange={(e) => onTagChange(e.target.value)}
          >
            <option value="">Tag</option>
            {tags.map(tag => (
              <option key={tag.id} value={tag.id}>{tag.name}</option>
            ))}
          </select>
        </div>
      )}

      {onCategoryChange && (
        <div className="col-6 col-md-3 col-lg-2">
          <select 
            className="form-select border-0 shadow-sm rounded-3 py-2 text-muted"
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="">Category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      )}
      </div>
    </div>
  )
}
