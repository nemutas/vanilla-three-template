uniform sampler2D u_texture;
uniform vec2 u_uvScale;
varying vec2 v_uv;

void main() {
  vec2 uv = (v_uv - 0.5) * u_uvScale + 0.5;
  vec4 tex = texture2D(u_texture, uv);
  gl_FragColor = tex;
}