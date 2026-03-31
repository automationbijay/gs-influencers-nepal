import pandas as pd
import json
import os

def clean_num(val):
    try:
        if pd.isna(val): return 0
        if isinstance(val, (int, float)): return int(val)
        val = str(val).lower().replace('k', '000').replace('m', '000000').replace(',', '').replace('+', '').strip()
        if '.' in val:
            return int(float(val))
        return int(val)
    except:
        return 0

def format_reach(f):
    if f >= 1000000: return f'{round(f/1000000, 1)}M'
    if f >= 1000: return f'{round(f/1000, 1)}K'
    return str(f)

def parse():
    file_path = 'influencers-nepal/Influencers Survey .xlsx'
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return

    df = pd.read_excel(file_path)
    
    # Identify columns
    name_col = next((c for c in df.columns if 'full name' in c.lower()), None)
    insta_col = next((c for c in df.columns if 'Instagram Followers' in c), None)
    tiktok_col = next((c for c in df.columns if 'TikTok Followers' in c), None)
    yt_col = next((c for c in df.columns if 'YouTube subscribers' in c), None)
    fb_col = next((c for c in df.columns if 'Facebook Page?' in c), None)
    location_col = next((c for c in df.columns if 'reside in' in c.lower()), None)
    platform_col = next((c for c in df.columns if 'primary social media platform' in c.lower()), None)

    influencers = []
    seen_names = set()

    for i, row in df.iterrows():
        raw_name = str(row.get(name_col))
        if pd.isna(row.get(name_col)) or raw_name.strip().lower() in ['fsdadfsa', 'fas', 'nan', 'test']:
            continue
        
        name = raw_name.strip()
        if name in seen_names:
            continue
        seen_names.add(name)

        # Reach calculation
        f_count = clean_num(row.get(insta_col, 0)) + \
                  clean_num(row.get(tiktok_col, 0)) + \
                  clean_num(row.get(yt_col, 0)) + \
                  clean_num(row.get(fb_col, 0))
        
        platform = str(row.get(platform_col, 'Instagram'))
        if platform == 'nan': platform = 'Creator'

        location = str(row.get(location_col, 'Nepal'))
        if location == 'nan': location = 'Nepal'

        influencers.append({
            'id': 1000 + i,
            'name': name,
            'handle': f"@{name.lower().replace(' ', '_')}",
            'niche': "Digital Creator",
            'followers': format_reach(f_count),
            'platform': platform,
            'image': f"https://api.dicebear.com/7.x/avataaars/svg?seed={name.replace(' ', '')}",
            'bio': f"Creative talent based in {location}. Open for meaningful collaborations."
        })

    # Sort by name
    influencers = sorted(influencers, key=lambda x: x['name'])
    
    os.makedirs('public/data', exist_ok=True)
    with open('public/data/influencers.json', 'w') as f:
        json.dump(influencers, f, indent=2)
    
    print(f"Successfully processed {len(influencers)} influencers.")

if __name__ == "__main__":
    parse()
