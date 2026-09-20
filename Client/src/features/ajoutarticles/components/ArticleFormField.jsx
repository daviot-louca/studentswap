function ArticleFormField({
    label,
    id,
    type = "text",
    value,
    onChange,
    placeholder = "",
    required = false,
    disabled = false,
    maxLength,
    rows,
    min,
    step,
    children,
  }) {
    const commonClassName =
      "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:bg-gray-50";
  
    return (
      <div>
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-semibold text-text"
        >
          {label}
          {required && (
            <span className="ml-1 text-primary">*</span>
          )}
        </label>
  
        {children ? (
          children
        ) : type === "textarea" ? (
          <textarea
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            maxLength={maxLength}
            rows={rows || 5}
            className={`${commonClassName} resize-none`}
          />
        ) : (
          <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            maxLength={maxLength}
            min={min}
            step={step}
            className={commonClassName}
          />
        )}
      </div>
    );
  }
  
  export default ArticleFormField;