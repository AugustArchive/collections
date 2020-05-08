export function deprecated(options: string | string[]): MethodDecorator {
  return (target: any, prop: string | symbol) => {
    const name = `Method ${String(prop)}`;
    console.log(`(immutable:${process.pid}) Warning: ${name} is now deprecated and will be removed in a future release. Please use ${typeof options === 'string' ? `function ${options}` : options.join(', ')}.`);
  };
}