(module
  (func (export "mul") (param f64 f64) (result f64)
    (f64.mul (local.get 0) (local.get 1))
  )

  (func (export "div") (param f64 f64) (result f64)
    (f64.div (local.get 0) (local.get 1))
  )
)